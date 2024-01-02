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
import { Row } from "react-bootstrap";
import ScouterStatus from "@/components/admin/ScouterStatus";

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

  return (
    <>
      <AdminStatusBar
        eventCode={mainData.activeEventCode}
        matchName={mainData.activeMatchName}
        isConnected={true}
      />
      {!ready && (
        <div className="vh-100 d-flex justify-content-center mt-5">
          <h1>Waiting...</h1>
        </div>
      )}

      {ready && (
        <>
          <Row className="my-4">
            <ScouterStatus heartbeats={adminData.heartbeats} />
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
        </>
      )}
    </>
  );
}
