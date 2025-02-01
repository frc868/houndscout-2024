"use client";
//Quick tip, you can ctrl+click on something from another file to go directly there.
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
  getTeamsAsync,
  setMatchScouterAsync,
  getAllTeamsAsync
} from "@/redux/adminDataSlice";
import MatchSchedule from "@/components/admin/MatchSchedule";
import { Button, Col, Container, Row } from "react-bootstrap";
import Activity from "@/components/admin/ClientActivity";
import AdminControls from "@/components/admin/MatchControls";
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

  //I just shoehorned every function in my update here; please optimize.
  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getActiveEventAsync());
      await dispatch(getActiveMatchAsync());
      await dispatch(getScoutersAsync());
      await dispatch(getEventsAsync());
      await dispatch(getHeartbeatsAsync());
      await dispatch(getAllTeamsAsync());
      await dispatch(getBlueOnLeftAsync());

      //These two things only trigger after the event code has been loaded.
      //For some reason it errored when I put them in the same thing.
      mainData.activeEvent?.code &&
        (await dispatch(
          getMatchesAsync({ eventCode: mainData.activeEvent?.code })
        ));
      mainData.activeEvent?.code &&
        (await dispatch(
          getTeamsAsync({ eventCode: mainData.activeEvent?.code })
        ));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEvent?.code, mainData.activeMatchName, mainData.blueOnLeft]);

  const ready = mainData.activeEvent?.code && adminData.matches && adminData.teams;
  //Displays a loading screen if these haven't been filled in the state yet.
  //This prevents errors from trying to render things too early.

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
            <li className="vh-1 d-flex justify-content-center mt-1">2. A Match has been created and linked to the active event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">3. A Team has been created and linked to the active event.</li>
          </ul>
        </>
      )}

      {/* Most of the documentation for these components are on their respective pages. */}
      {ready && (
        <Container>
          <EventManageModal
            show={showEventManage}
            eventList={adminData?.eventList as Event[]}
            activeEvent={mainData.activeEvent?.code as string}
            handleClose={() => setShowEventManage(false)}
          ></EventManageModal>
          <Row className="my-4">
            <Col md={5}>
              <Activity
                scouters={activeMatch?.scouters}
                heartbeats={adminData.heartbeats}
              />
            </Col>
            <Col md={4}>
              <EventDetails
                event={mainData.activeEvent as Event}
              />
              <Button
              variant="secondary"
              className="edit-button mx-auto"
              onClick={() => setShowEventManage(true)}
              >
                Manage Events
              </Button>
            </Col>
            <Col md={3}>
              <AdminControls
                scouters={adminData.scouters as Scouter[]}
                teams={adminData.allTeams as Team[]}
                eventCode={mainData.activeEvent?.code as string}
                blueOnLeft={mainData.blueOnLeft as boolean}
              />
            </Col>
          </Row>
          <Row>
            <MatchSchedule
              matches={adminData.matches as Match[]}
              teams={adminData.teams as Team[]}
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
