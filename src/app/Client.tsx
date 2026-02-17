
Client · TSX
"use client";
//You found it! (lame joke punchline)

//The page info for every client page.
import {
  cleanForPostmatch,
  clearEvents,
  resetScores,
} from "@/redux/scoresSlice";
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
  getStationData,
  sendHeartbeatAsync,
  setStation,
} from "@/redux/mainDataSlice";
import { Section, Station } from "@prisma/client";

interface Props {
  station: Station;
}

export default function Client({ station }: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<Section>(Section.PREMATCH);

  useEffect(() => {
    const update = async () => {
      await dispatch(setStation({ station }));
      await dispatch(getStationData({ station }));
      await dispatch(sendHeartbeatAsync({ station, section: tab }));
    };
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, station, tab]);

  // Reset tab to prematch when a new match starts
  useEffect(() => {
    setTab(Section.PREMATCH);
  }, [mainData.activeMatchName]);

  const ready = mainData.scouter.name
    && mainData.activeTeamNumber &&
    mainData.activeMatchName;

  // Clear events when entering a new (unsubmitted) match
  useEffect(() => {
    if (!mainData.submitted && ready) dispatch(clearEvents({}));
  }, [mainData.submitted, ready, dispatch]);

  return (
    <>
      <StatusBar
        scouterName={mainData.scouter.name}
        team={mainData.activeTeamNumber}
        matchName={mainData.activeMatchName}
        isConnected={true}
      />
      {!ready && (
        <>
          <div className="vh-30 d-flex justify-content-center mt-5">
            <h1>Waiting...</h1>
          </div>
          <div className="vh-3 d-flex justify-content-center mt-5">
            <h5>If this screen persists, please have the lead scouter ensure the following has been done:</h5>
          </div>
          <ul className="vh-1 d-flex flex-column justify-content-center mt-3">
            <li className="vh-1 d-flex justify-content-center mt-1">1. Set an active match.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">2. Teams have been assigned to each station in each match.</li>
          </ul>
        </>
      )}
      <div
        className={`${mainData.submitted ? "bg-submitted" : mainData.cancelled ? "bg-danger" : ""}`}
        style={{
          transition: "all 0.5s",
          height: "calc(100vh - 56px)",
        }}
      >
        {mainData.submitted ? (
          <div className="d-flex justify-content-center align-items-center h-75 flex-column">
            <h1 className="display-1 fw-bold">Submitted successfully!</h1>
            <h1 className="mt-3">Waiting for next match...</h1>
          </div>
        ) : mainData.cancelled ? (
          <div className="d-flex justify-content-center align-items-center h-75 flex-column">
            <h1 className="display-1 fw-bold">Score cancelled.</h1>
            <h1 className="mt-3">Waiting for next match...</h1>
          </div>
        ) : (
          <div>
            {ready && (
              <SectionSelector selected={tab} handleSelection={setTab} />
            )}
            {ready && (
              <>
                {/* UPDATE CYCLE (Client): Each content component only needs show prop now. */}
                {/* All scoring state is managed via Redux inside each component. */}
                <PrematchContent show={tab === Section.PREMATCH} />
                <AutoContent show={tab === Section.AUTO} />
                <TeleopContent show={tab === Section.TELEOP} />
                <PostmatchContent show={tab === Section.POSTMATCH} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}