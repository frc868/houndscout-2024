"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  getActiveEventAsync,
  getActiveMatchAsync,
} from "@/redux/mainDataSlice";
import AdminStatusBar from "@/components/admin/AdminStatusBar";
import {
  Match,
  Scouter,
  Team,
  deleteMatchAsync,
  getHeartbeatsAsync,
  getMatchesAsync,
  getScoutersAsync,
  getTeamsAsync,
  setActiveMatchAsync,
  setMatchScouterAsync,
} from "@/redux/adminDataSlice";
import MatchSchedule from "@/components/admin/MatchSchedule";
import { Button, Col, Container, Row } from "react-bootstrap";
import Activity from "@/components/admin/Activity";
import Controls from "@/components/admin/MatchControls";
import { Event } from "@prisma/client";
import EventDetails from "@/components/admin/EventDetails";

export default function Admin() {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const adminData = useSelector((state: ReduxState) => state.adminData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getActiveEventAsync());
      await dispatch(getActiveMatchAsync());
      await dispatch(getScoutersAsync());
      await dispatch(getHeartbeatsAsync());
      await dispatch(getTeamsAsync());

      mainData.activeEvent?.code &&
        (await dispatch(
          getMatchesAsync({ eventCode: mainData.activeEvent?.code })
        ));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEvent?.code, mainData.activeMatchName]);

  const ready = mainData.activeEvent?.code && adminData.matches;

  const activeMatch = adminData.matches?.filter(
    (match) => match.name === mainData.activeMatchName
  )[0];

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
            <h5>If you haven't done so already, please go to Prisma Studio and do the following:</h5>
          </div>
          <ul className="vh-1 d-flex flex-column justify-content-center mt-3">
            <li className="vh-1 d-flex justify-content-center mt-1">1. Create and fill in 6 Heartbeats, one for each station.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">2. Create and fill in an Event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">3. Create a row in Server and set the Event to this event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">4. Create a Team for every team in the event and fill in team number, name, and location</li>
          </ul>
        </>
      )}

      {ready && (
        <Container>
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
            </Col>
            <Col md={3}>
              <Controls eventCode={mainData.activeEvent?.code as string} />
            </Col>
          </Row>
          <Row>
            <MatchSchedule
              matches={adminData.matches as Match[]}
              teams={adminData.teams as Team[]}
              activeMatchName={mainData.activeMatchName as string}
              handleMatchSelect={async (name) =>
                await dispatch(
                  setActiveMatchAsync({
                    eventCode: mainData.activeEvent?.code as string,
                    matchName: name,
                  })
                )
              }
              handleMatchDelete={async (name) =>
                await dispatch(
                  deleteMatchAsync({
                    eventCode: mainData.activeEvent?.code as string,
                    matchName: name,
                  })
                )
              }
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
