"use client";

import SectionSelector from "@/components/common/SectionSelector";
import StatusBar from "@/components/common/StatusBar";
import { useEffect, useState } from "react";
import AutoContent from "@/components/content/AutoContent";
import PostmatchContent from "@/components/content/PostmatchContent";
import TeleopContent from "@/components/content/TeleopContent";
import PrematchContent from "@/components/content/PrematchContent";
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

interface Props {
  id: "red1" | "red2" | "red3" | "blue1" | "blue2" | "blue3";
}

export default function Client({ id }: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<"auto" | "prematch" | "teleop" | "postmatch">(
    "prematch"
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getActiveEventAsync());
      await dispatch(getActiveMatchAsync());
      await dispatch(sendHeartbeatAsync({ station: id, section: tab }));
      await dispatch(setStation({ station: id }));

      if (mainData.activeEventCode && mainData.activeMatchName) {
        await dispatch(
          getActiveTeamNumberAsync({
            eventCode: mainData.activeEventCode,
            matchName: mainData.activeMatchName,
            station: id,
          })
        );
        await dispatch(
          getScouterAsync({
            eventCode: mainData.activeEventCode,
            matchName: mainData.activeMatchName,
            station: id,
          })
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEventCode, mainData.activeMatchName, id, tab]);

  const ready = true; //bypassing data checks
    // mainData.scouter.name &&
    // mainData.activeTeamNumber &&
    // mainData.activeMatchName;

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
      {ready && <SectionSelector selected={tab} handleSelection={setTab} />}
      {ready && tab === "prematch" && <PrematchContent />}
      {ready && tab === "auto" && <AutoContent />}
      {ready && tab === "teleop" && <TeleopContent />}
      {ready && tab === "postmatch" && <PostmatchContent />}
    </>
  );
}
