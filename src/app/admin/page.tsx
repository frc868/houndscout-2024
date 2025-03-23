"use client";
//This stuff should work regardless of the game, but I'll try to explain it in case you want to make changes.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  getActiveEventAsync,
  getActiveMatchAsync,
  getBlueOnLeftAsync
} from "@/redux/mainDataSlice";
import AdminStatusBar from "@/components/admin/AdminStatusBar";
import {
  getEventsAsync,
  getHeartbeatsAsync,
  getMatchesAsync,
  getScoutersAsync,
  getEventTeamsAsync,
  setMatchScouterAsync,
  getAllTeamsAsync
} from "@/redux/adminDataSlice";
import MatchSchedule from "@/components/admin/MatchSchedule";
import { Button, Col, Container, Row } from "react-bootstrap";
import Activity from "@/components/admin/ClientActivity";
import AdminControls from "@/components/admin/AdminControls";
import { Event } from "@prisma/client";
import EventDetails from "@/components/admin/EventDetails";
import EventManageModal from "@/components/admin/EventManageModal";
import {
  Match,
  Scouter,
  Team
} from "@/lib/enums";

export default function Admin() {
  //Accesses Redux state. You can find more details in mainDataSlice and adminDataSlice.
  //Do note that you'll have to manually add imports for your async thunks and any interfaces stored there.
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const adminData = useSelector((state: ReduxState) => state.adminData);
  //dispatch is used to call functions in a redux file.
  const dispatch = useDispatch<AppDispatch>();

  
  useEffect(() => {
    //Every second, these functions get data from the database.
    const interval = setInterval(async () => {
      await dispatch(getScoutersAsync());
      await dispatch(getEventsAsync());
      await dispatch(getHeartbeatsAsync());
      await dispatch(getBlueOnLeftAsync());
      await dispatch(getActiveEventAsync());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    //These things relate to the active event.
    const interval = setInterval(async () => {
      //Every second, these functions get match and team-related data from the database.
      await dispatch(getAllTeamsAsync());

      //These two things only trigger after the event code has been loaded.
      //For some reason it errored when I put them in the same thing.
      mainData.activeEvent?.code &&
        (await dispatch(
          getMatchesAsync({ eventCode: mainData.activeEvent?.code })
        ));
      mainData.activeEvent?.code &&
        (await dispatch(
          getEventTeamsAsync({ eventCode: mainData.activeEvent?.code })
        ));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEvent?.code]);

  useEffect(() => {
    //Every second, these functions get data from the database.
    //These things relate to the active match.
    const interval = setInterval(async () => {
      await dispatch(getActiveMatchAsync());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeMatchName]);

  //Displays a loading screen if these haven't been filled in the state yet.
  //This prevents errors from trying to render things too early.
  const ready = mainData.activeEvent?.code && adminData.matches && adminData.eventTeams;

  //Gets more specific data about the current match in the database.
  const activeMatch = adminData.matches?.filter(
    (match) => match.name === mainData.activeMatchName
  )[0];

  const [showEventManage, setShowEventManage] = useState(false);//Modal toggle

  return (
    <>
      <AdminStatusBar
        eventCode={mainData.activeEvent?.code}
        matchName={mainData.activeMatchName}
        isConnected={true}
      />

      {/* Loading Screen */}
      {!ready && (
        <>
          <div className="vh-30 d-flex justify-content-center mt-5">
            <h1>Waiting...</h1>
          </div>
          <div className="vh-3 d-flex justify-content-center mt-5">
            <h5>If this screen persists, please consult Prisma Studio and ensure the following are true:</h5>
          </div>
          <ul className="vh-1 d-flex flex-column justify-content-center mt-3">
            <li className="vh-1 d-flex justify-content-center mt-1">1. In Server, activeEvent has been set to a created Event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">2. A Team has been created and linked to activeEvent.</li>
          </ul>
        </>
      )}

      {/* Most of the documentation for these components are on their respective pages. */}
      {ready && (
        <Container>
          <Row className="my-4">
            <Col md={5}>
              <Activity
                scouters={activeMatch?.scouters}
                submitted={activeMatch?.submitted}
                heartbeats={adminData.heartbeats}
              />
            </Col>
            <Col md={4}>
              <EventDetails
                event={mainData.activeEvent as Event}
              />
            </Col>
            <Col md={3}>
              <AdminControls
                scouters={adminData.scouters as Scouter[]}
                allTeams={adminData.allTeams as Team[]}
                eventTeams={adminData.eventTeams as Team[]}
                eventCode={mainData.activeEvent?.code as string}
                blueOnLeft={mainData.blueOnLeft as boolean}
                eventList={adminData?.eventList as Event[]}
              />
            </Col>
          </Row>
          <Row>
            <MatchSchedule
              matches={adminData.matches as Match[]}
              teams={adminData.eventTeams as Team[]}
              activeMatchName={mainData.activeMatchName as string}
              scouters={adminData.scouters as Scouter[]}
              handleScouterSelect={async (matchName, station, id) => {
                await dispatch(
                  setMatchScouterAsync({
                    eventCode: mainData.activeEvent?.code as string,
                    matchName,
                    station,
                    scouterId: id,
                  })
                );
              }}
            />
          </Row>
        </Container>
      )}
    </>
  );
}
