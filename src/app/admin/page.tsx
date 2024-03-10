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
  getHeartbeatsAsync,
  getMatchesAsync,
  getScoutersAsync,
  setActiveMatchAsync,
  setMatchScouterAsync,
} from "@/redux/adminDataSlice";
import MatchSchedule from "@/components/admin/MatchSchedule";
import { Col, Container, Row } from "react-bootstrap";
import Activity from "@/components/admin/Activity";

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

      mainData.activeEventCode &&
        (await dispatch(
          getMatchesAsync({ eventCode: mainData.activeEventCode })
        ));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEventCode, mainData.activeMatchName]);

  const ready =
    mainData.activeEventCode && mainData.activeMatchName && adminData.matches;

  const activeMatch = adminData.matches?.filter(
    (match) => match.name === mainData.activeMatchName
  )[0] as Match;

  return (
    <>
      <AdminStatusBar
        eventCode={mainData.activeEventCode}
        matchName={mainData.activeMatchName}
        isConnected={false}
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
                scouters={activeMatch.scouters}
                heartbeats={adminData.heartbeats}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <MatchSchedule
              matches={adminData.matches as Match[]}
              activeMatchName={mainData.activeMatchName as string}
              handleMatchSelect={async (name) =>
                await dispatch(
                  setActiveMatchAsync({
                    eventCode: mainData.activeEventCode as string,
                    matchName: name,
                  })
                )
              }
              scouters={adminData.scouters as Scouter[]}
              handleScouterSelect={async (matchName, station, id) => {
                await dispatch(
                  setMatchScouterAsync({
                    eventCode: mainData.activeEventCode as string,
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
