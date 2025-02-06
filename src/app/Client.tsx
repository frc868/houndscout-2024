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

  const [coralIntakeLocation, setCoralIntakeLocation] = useState<
    CoralIntakeLocation | undefined
  >(undefined);
  const [coralScoringLevel, setCoralScoringLevel] = useState<
    CoralScoringLevel | undefined
  >(undefined);
  const [coralScoringSide, setCoralScoringSide] = useState<
    CoralScoringSide | undefined
  >(undefined);
  const [coralActiveSide, setCoralActiveSide] = useState("level");//This is set between intaking, level, side, and result.
  const [coralStartTime, setCoralStartTime] = useState(0);
  const [coralEndTime, setCoralEndTime] = useState(0);

  const [algaeIntakeLocation, setAlgaeIntakeLocation] = useState<
    AlgaeIntakeLocation | undefined
  >(undefined);
  const [algaeScoringLocation, setAlgaeScoringLocation] = useState<
    AlgaeScoringLocation | undefined
  >(undefined);
  const [algaeActiveSide, setAlgaeActiveSide] = useState("intaking");//This is set between intaking, scoring, and result.
  const [algaeStartTime, setAlgaeStartTime] = useState(0);
  const [algaeEndTime, setAlgaeEndTime] = useState(0);

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
  }, [dispatch, station, tab, coralActiveSide]);

  useEffect(() => {
    setSubmitted(false);
    setTab(Section.PREMATCH);
  }, [mainData.activeMatchName]);

  const [incapOn, setIncapOn] = useState(false);
  const [incapStartTime, setIncapStartTime] = useState(0);

  //triggers when intake location is selected
  const handleIncap = async () => {
    if(incapOn){
      const event = {
        timestampStarted: incapStartTime,
        timestampEnded: Date.now(),
        full: true
      }; //incapSegment creation.
      setIncapStartTime(0);
      setIncapOn(false);  

      await dispatch(sendIncapSegment(event));
    } else {
      setIncapStartTime(Date.now());
      setIncapOn(true);   
    }   
  };

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
      setIncapStartTime(0);
      setIncapOn(false);  

      await dispatch(sendIncapSegment(event));
    }
  };

  //UPDATE CYCLE (out of date): Make sure everything down to handleScoringSelection is duplicated if there's multiple game pieces.
  //Also ensure the enums used are accurate; those are imported from Prisma, so update those as well.
  
  const handleCoral = async (
    phrase: string,
    data:{
      intakeSelection?: CoralIntakeLocation,
      scoringLevel?: CoralScoringLevel,
      dropped?: boolean,
      scoringSide?: CoralScoringSide,
      failedScoring?: boolean,
    },
  ) => {
    if(phrase==coralActiveSide){
      if (phrase=="intaking"){
        setCoralStartTime(Date.now());
        setCoralIntakeLocation(data.intakeSelection);
        setCoralActiveSide("level");  
      } else if (phrase=="level"){
        if(data.dropped){
          const event = {
            intakeLocation: coralIntakeLocation as CoralIntakeLocation,
            scoringLevel: undefined,
            scoringSide: undefined,
            failedScoring: true,
            dropped: true,
            timestampPickedUp: algaeStartTime,
            timestampScored: Date.now(),
          }; //teleopScoringEvent creation.
          setCoralIntakeLocation(undefined);
          setCoralStartTime(0);
          setCoralActiveSide("intaking");
    
          await dispatch(sendCoralEvent(event));
        } else {
          setCoralEndTime(Date.now());
          setCoralScoringLevel(data.scoringLevel);
          if(tab==Section.AUTO){
            setCoralActiveSide("side"); 
          } else {
            setCoralActiveSide("result"); 
          }
        }
      } else if (phrase == "side") {
        setCoralScoringSide(data.scoringSide);
        setCoralActiveSide("result");   
      } else if (phrase == "result") {
        const event = {
          intakeLocation: coralIntakeLocation as CoralIntakeLocation,
          scoringLevel: coralScoringLevel as CoralScoringLevel,
          scoringSide: coralScoringSide as CoralScoringSide,
          failedScoring: data.failedScoring,
          dropped: false,
          timestampPickedUp: coralStartTime,
          timestampScored: coralEndTime,
        }; //teleopScoringEvent creation.
        setCoralIntakeLocation(undefined);
        setCoralScoringLevel(undefined);
        setCoralScoringSide(undefined);
        setCoralStartTime(0);
        setCoralEndTime(0);
        setCoralActiveSide("intaking");
  
        await dispatch(sendCoralEvent(event));
      }
    }
  };

  const handleAlgae = async (
    phrase: string,
    data:{
      intakeSelection?: AlgaeIntakeLocation,
      scoringLocation?: AlgaeScoringLocation,
      dropped?: boolean,
      failedScoring?: boolean,
    },
  ) => {
    if(phrase==algaeActiveSide){
      if (phrase=="intaking"){
        setAlgaeStartTime(Date.now());
        setAlgaeIntakeLocation(data.intakeSelection);
        setAlgaeActiveSide("scoring");  
      } else if (phrase=="scoring"){
        if(data.dropped){
          const event = {
            intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
            scoringLocation: undefined,
            failedScoring: true,
            dropped: true,
            timestampPickedUp: algaeStartTime,
            timestampScored: Date.now(),
          }; //scoring event creation.
          setAlgaeIntakeLocation(undefined);
          setAlgaeStartTime(0);
          setAlgaeActiveSide("intaking");
    
          await dispatch(sendAlgaeEvent(event));
        } else {
          setAlgaeEndTime(Date.now());
          setAlgaeScoringLocation(data.scoringLocation);
          setAlgaeActiveSide("result"); 
        }
      } else if (phrase == "result") {
        const event = {
          intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
          scoringLocation: algaeScoringLocation as AlgaeScoringLocation,
          failedScoring: data.failedScoring,
          dropped: false,
          timestampPickedUp: algaeStartTime,
          timestampScored: algaeEndTime,
        }; //scoring event creation.
        setAlgaeIntakeLocation(undefined);
        setAlgaeScoringLocation(undefined);
        setAlgaeStartTime(0);
        setAlgaeEndTime(0);
        setAlgaeActiveSide("intaking");
  
        await dispatch(sendAlgaeEvent(event));
      }
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
                <PrematchContent
                  show={tab === Section.PREMATCH}
                  coralActiveSide={coralActiveSide}
                  handlePreload={()=>{
                    if(coralActiveSide=="level"){
                      setCoralActiveSide("intaking");
                    } else setCoralActiveSide("level");
                  }}
                />
                <AutoContent
                  show={tab === Section.AUTO}
                  coralActiveSide={coralActiveSide}
                  coralIntakeLocation={coralIntakeLocation}
                  coralScoringLevel={coralScoringLevel}
                  coralScoringSide={coralScoringSide}
                  handleCoral={handleCoral}
                  algaeActiveSide={algaeActiveSide}
                  algaeIntakeLocation={algaeIntakeLocation}
                  algaeScoringLocation={algaeScoringLocation}
                  handleAlgae={handleAlgae}
                  incapOn={incapOn}
                  handleIncap={incapOn?handleIncapEnd:handleIncapStart}
                />
                <TeleopContent
                  show={tab === Section.TELEOP}
                  coralActiveSide={coralActiveSide}
                  coralIntakeLocation={coralIntakeLocation}
                  handleCoral={handleCoral}
                  handleAlgae={handleAlgae}
                  algaeActiveSide={algaeActiveSide}
                  algaeIntakeLocation={algaeIntakeLocation}
                  incapOn={incapOn}
                  handleIncap={incapOn?handleIncapEnd:handleIncapStart}
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
