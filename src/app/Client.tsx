"use client";
//You found it! (lame joke punchline)

//The page info for every client page.
import SectionSelector from "@/components/client/common/SectionSelector";
import StatusBar from "@/components/client/common/StatusBar";
import { CoralIntakeLocation, AlgaeIntakeLocation, CoralScoringLevel, AlgaeScoringLocation, CoralScoringSide } from "@prisma/client";
import { useEffect, useState } from "react";
import AutoContent from "@/components/client/content/AutoContent";
import PostmatchContent from "@/components/client/content/PostmatchContent";
import TeleopContent from "@/components/client/content/TeleopContent";
import EndgameContent from "@/components/client/content/EndgameContent";
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
import {
  sendCoralEvent,
  sendAlgaeEvent,
  sendIncapSegment,
} from "@/redux/scoresSlice";
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
    const update = async () => {
      await dispatch(setStation({ station }));
      await dispatch(getStationData({ station }));
      await dispatch(sendHeartbeatAsync({ station, section: tab }));
    };
    update();
    //Skips the side selection if moving off of Auto with it on.
    if(tab!==Section.AUTO&&coralActiveSide=="side"){
      setCoralActiveSide("result");
    }
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [dispatch, station, tab]);

  useEffect(() => {
    setSubmitted(false);
    setTab(Section.PREMATCH);
  }, [mainData.activeMatchName]);

  const [incapOn, setIncapOn] = useState(false);
  const [incapStartTime, setIncapStartTime] = useState(0);

  //triggers when intake location is selected
  const handleIncapStart = () => {
    //Add a timestamp creator at the first scoring input.
    setIncapStartTime(Date.now());
    setIncapOn(true);    
  };
  //triggers when scoring location is selected
  const handleIncapEnd = async () => {
    if (incapOn) {
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: true
      }; //incapSegment creation.
      setIncapOn(false);  

      await dispatch(sendIncapSegment(event));
    }
  };

  //UPDATE CYCLE: Make sure everything down to handleScoringSelection is duplicated if there's multiple game pieces.
  //Also ensure the enums used are accurate; those are imported from Prisma, so update those as well.
  const [coralIntakeLocation, setCoralIntakeLocation] = useState<
    CoralIntakeLocation | undefined
  >(undefined);
  const [coralScoringLevel, setCoralScoringLevel] = useState<
    CoralScoringLevel | undefined
  >(undefined);
  const [coralScoringSide, setCoralScoringSide] = useState<
    CoralScoringSide | undefined
  >(undefined);
  const [coralActiveSide, setCoralActiveSide] = useState("intaking");//This is set between intaking, level, side, and result.
  const [coralStartTime, setCoralStartTime] = useState(0);
  const [coralEndTime, setCoralEndTime] = useState(0);

  //triggers when intake location is selected
  const handleCoralIntakeSelection = (selection: CoralIntakeLocation) => {
    setCoralStartTime(Date.now());
    setCoralIntakeLocation(selection);
    setCoralActiveSide("level");    
  };
  //triggers when scoring location is selected
  const handleCoralLevelSelection = async (
    level?: CoralScoringLevel,
    dropped?: boolean
  ) => {
    if (coralActiveSide == "level") {
      if(dropped){
        const event = {
          intakeLocation: coralIntakeLocation as CoralIntakeLocation,
          scoringLevel: undefined,
          scoringSide: undefined,
          failedScoring: true,
          dropped: true,
          timestampPickedUp: algaeStartTime,
          timestampScored: Date.now(),
        }; //teleopScoringEvent creation.
        setAlgaeIntakeLocation(undefined);
        setAlgaeActiveSide("intaking");
  
        await dispatch(sendCoralEvent(event));
      } else {
        setCoralEndTime(Date.now());
        setCoralScoringLevel(level);
        if(tab==Section.AUTO){
          setCoralActiveSide("side"); 
        } else {
          setCoralActiveSide("result"); 
        }
      }
    }
  };
  const handleCoralSideSelection = (side: CoralScoringSide) => {
    if (coralActiveSide == "side") {
      setCoralScoringSide(side);
      setCoralActiveSide("result");   
    } 
  };
  const handleCoralResultSelection = async (
    failedScoring?: boolean,
  ) => {
    if (coralActiveSide == "result") {
      const event = {
        intakeLocation: coralIntakeLocation as CoralIntakeLocation,
        scoringLevel: coralScoringLevel as CoralScoringLevel,
        scoringSide: coralScoringSide as CoralScoringSide,
        failedScoring: failedScoring,
        dropped: false,
        timestampPickedUp: algaeStartTime,
        timestampScored: algaeEndTime,
      }; //teleopScoringEvent creation.
      setCoralIntakeLocation(undefined);
      setCoralScoringSide(undefined);
      setCoralActiveSide("intaking");

      await dispatch(sendCoralEvent(event));
    }
  };

  const [algaeIntakeLocation, setAlgaeIntakeLocation] = useState<
    AlgaeIntakeLocation | undefined
  >(undefined);
  const [algaeScoringLocation, setAlgaeScoringLocation] = useState<
    AlgaeScoringLocation | undefined
  >(undefined);
  const [algaeActiveSide, setAlgaeActiveSide] = useState("intaking");//This is set between intaking, scoring, and result.
  const [algaeStartTime, setAlgaeStartTime] = useState(0);
  const [algaeEndTime, setAlgaeEndTime] = useState(0);
  
  //triggers when intake location is selected
  const handleAlgaeIntakeSelection = (selection: AlgaeIntakeLocation) => {
    setAlgaeStartTime(Date.now());
    setAlgaeIntakeLocation(selection);
    setAlgaeActiveSide("scoring");    
  };
  //triggers when scoring location is selected
  const handleAlgaeScoringSelection = async (
    location?: AlgaeScoringLocation,
    dropped?: boolean
  ) => {
    if (algaeActiveSide == "scoring") {
      if(dropped){
        const event = {
          intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
          scoringLocation: undefined,
          failedScoring: true,
          dropped,
          timestampPickedUp: algaeStartTime,
          timestampScored: Date.now(),
        }; //teleopScoringEvent creation.
        setAlgaeIntakeLocation(undefined);
        setAlgaeActiveSide("intaking");
  
        await dispatch(sendAlgaeEvent(event));
      } else {
        setAlgaeEndTime(Date.now());
        setAlgaeScoringLocation(location);
        setAlgaeActiveSide("result"); 
      }
    }
  };
  //triggers when scoring location is selected
  const handleAlgaeResultSelection = async (
    failedScoring?: boolean,
  ) => {
    if (algaeActiveSide == "result") {
      const event = {
        intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
        scoringLocation: algaeScoringLocation as AlgaeScoringLocation,
        failedScoring,
        dropped: false,
        timestampPickedUp: algaeStartTime,
        timestampScored: algaeEndTime,
      }; //teleopScoringEvent creation.
      setAlgaeIntakeLocation(undefined);
      setAlgaeActiveSide("intaking");

      await dispatch(sendAlgaeEvent(event));
    }
  };

  const ready = mainData.scouter.name
    && mainData.activeTeamNumber &&
    mainData.activeMatchName;

  return (
    <>
      <StatusBar
        scouterName={mainData.scouter.name}
        team={mainData.activeTeamNumber}
        matchName={mainData.activeMatchName}
        isConnected={true}
        incapActive={incapOn}
        handleIncap={incapOn?handleIncapEnd:handleIncapStart}
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
          <li className="vh-1 d-flex justify-content-center mt-1">1. Set an active match. </li>
          <li className="vh-1 d-flex justify-content-center mt-1">2. Scouters and teams have been assigned to each station in each match.</li>
        </ul>
      </>
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
            {ready && (
              <>
              {/* ...and now you'll have to go into each tab to look at everything. */}
                <PrematchContent show={tab === Section.PREMATCH} />
                <AutoContent
                  show={tab === Section.AUTO}
                  coralActiveSide={coralActiveSide}
                  coralIntakeLocation={coralIntakeLocation}
                  handleCoralIntakeSelection={handleCoralIntakeSelection}
                  handleCoralLevelSelection={handleCoralLevelSelection}
                  handleCoralSideSelection={handleCoralSideSelection}
                  handleCoralResultSelection={handleCoralResultSelection}
                  algaeActiveSide={algaeActiveSide}
                  algaeIntakeLocation={algaeIntakeLocation}
                  handleAlgaeIntakeSelection={handleAlgaeIntakeSelection}
                  handleAlgaeScoringSelection={handleAlgaeScoringSelection}
                  handleAlgaeResultSelection={handleAlgaeResultSelection}
                  incapOn={incapOn}
                />
                <TeleopContent
                  show={tab === Section.TELEOP}
                  coralActiveSide={coralActiveSide}
                  coralIntakeLocation={coralIntakeLocation}
                  handleCoralIntakeSelection={handleCoralIntakeSelection}
                  handleCoralScoringSelection={handleCoralLevelSelection}
                  handleCoralResultSelection={handleCoralResultSelection}
                  algaeActiveSide={algaeActiveSide}
                  algaeIntakeLocation={algaeIntakeLocation}
                  handleAlgaeIntakeSelection={handleAlgaeIntakeSelection}
                  handleAlgaeScoringSelection={handleAlgaeScoringSelection}
                  handleAlgaeResultSelection={handleAlgaeResultSelection}
                  incapOn={incapOn}
                />
                <EndgameContent show={tab === Section.ENDGAME} incapOn={incapOn} />
                <PostmatchContent
                  show={tab === Section.POSTMATCH}
                  handleSubmit={() => setSubmitted(true)}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
