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
  deleteMatchAsync,
  getHeartbeatsAsync,
  getMatchesAsync,
  getScoutersAsync,
  setActiveMatchAsync,
  setMatchScouterAsync,
} from "@/redux/adminDataSlice";
import MatchSchedule from "@/components/admin/MatchSchedule";
import { Button, Col, Container, Row } from "react-bootstrap";
import Activity from "@/components/admin/Activity";
import Controls from "@/components/admin/Controls";
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
        <div className="vh-100 d-flex justify-content-center mt-5">
          <h1>Waiting...</h1>
        </div>
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
              <EventDetails event={mainData.activeEvent as Event} />
            </Col>
            <Col md={3}>
              <Controls eventCode={mainData.activeEvent?.code as string} />
            </Col>
          </Row>
          <Row>
            <MatchSchedule
              matches={adminData.matches as Match[]}
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
