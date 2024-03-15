"use client";

import SectionSelector from "@/components/client/common/SectionSelector";
import StatusBar from "@/components/client/common/StatusBar";
import { useEffect, useState } from "react";
import AutoContent from "@/components/client/content/AutoContent";
import PostmatchContent from "@/components/client/content/PostmatchContent";
import TeleopContent from "@/components/client/content/TeleopContent";
import PrematchContent from "@/components/client/content/PrematchContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  getActiveEventAsync,
  getActiveMatchAsync,
  getActiveTeamNumberAsync,
  getScouterAsync,
  sendHeartbeatAsync,
  setStation,
} from "@/redux/mainDataSlice";
import { Section, Station } from "@prisma/client";

interface Props {
  station: Station;
}

export default function Client({ station }: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<Section>(Section.PREMATCH);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getActiveEventAsync());
      await dispatch(getActiveMatchAsync());
      await dispatch(sendHeartbeatAsync({ station, section: tab }));
      await dispatch(setStation({ station }));

      if (mainData.activeEventCode && mainData.activeMatchName) {
        await dispatch(
          getActiveTeamNumberAsync({
            eventCode: mainData.activeEventCode,
            matchName: mainData.activeMatchName,
            station: station,
          })
        );
        await dispatch(
          getScouterAsync({
            eventCode: mainData.activeEventCode,
            matchName: mainData.activeMatchName,
            station: station,
          })
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    dispatch,
    mainData.activeEventCode,
    mainData.activeMatchName,
    station,
    tab,
  ]);

  const ready =
    mainData.scouter.name &&
    mainData.activeTeamNumber &&
    mainData.activeMatchName;

  return (
    <>
      <StatusBar
        scouterName={mainData.scouter.name}
        team={mainData.activeTeamNumber}
        matchName={mainData.activeMatchName}
        isConnected={true}
      />
      {!ready && (
        <div className="vh-100 d-flex justify-content-center mt-5">
          <h1>Waiting...</h1>
        </div>
      )}
      <div
        className={`${submitted && "bg-submitted"}`}
        style={{
          transition: "all 0.5s",
          height: "calc(100vh - 56px)",
        }}
      >
        {submitted ? (
          <div className="d-flex justify-content-center align-items-center h-75 flex-column">
            <h1 className="display-1 fw-bold">Submitted successfully!</h1>
            <h1 className="mt-3">Waiting for next match...</h1>
          </div>
        ) : (
          <div>
            {ready && (
              <SectionSelector selected={tab} handleSelection={setTab} />
            )}
            {ready && tab === Section.PREMATCH && <PrematchContent />}
            {ready && tab === Section.AUTO && <AutoContent />}
            {ready && tab === Section.TELEOP && <TeleopContent />}
            {ready && tab === Section.POSTMATCH && (
              <PostmatchContent handleSubmit={() => setSubmitted(true)} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
