"use client";
//You found it! (lame joke punchline)

//The page info for every client page.
import {
  cleanForPostmatch,
  handleAlgaeCancel,
  handleCoral,
  handleCoralCancel,
  setCoralActiveSide,
  setLeftStartingZoneAsync,
} from "@/redux/scoresSlice";
import SectionSelector from "@/components/client/common/SectionSelector";
import StatusBar from "@/components/client/common/StatusBar";
import { CoralIntakeLocation, AlgaeIntakeLocation, CoralScoringLevel, AlgaeScoringLocation, CoralScoringSide } from "@prisma/client";
import { useEffect, useState, useRef } from "react";
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
import {
  sendCoralEvent,
  sendAlgaeEvent,
  sendIncapSegment,
  clearEvents,
} from "@/redux/scoresSlice";
import { Section, Station } from "@prisma/client";

interface Props {
  station: Station;
}

export default function Client({ station }: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const scores = useSelector((state: ReduxState) => state.scores);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<Section>(Section.PREMATCH);

  //UPDATE CYCLE (Client): Basically we need variables to store the intake location, scoring location, active side, start time, and end time for each game piece.
  // const [coralIntakeLocation, setCoralIntakeLocation] = useState<
  //   CoralIntakeLocation | undefined
  // >(undefined);
  // const [coralScoringLevel, setCoralScoringLevel] = useState<
  //   CoralScoringLevel | undefined
  // >(undefined);
  // const [coralScoringSide, setCoralScoringSide] = useState<
  //   CoralScoringSide | undefined
  // >(undefined);
  // const [coralActiveSide, setCoralActiveSide] = useState("level");//This is set between intaking, level, side, and result.
  // const [coralStartTime, setCoralStartTime] = useState(0);
  // const [coralEndTime, setCoralEndTime] = useState(0);

  // const [algaeIntakeLocation, setAlgaeIntakeLocation] = useState<
  //   AlgaeIntakeLocation | undefined
  // >(undefined);
  // const [algaeScoringLocation, setAlgaeScoringLocation] = useState<
  //   AlgaeScoringLocation | undefined
  // >(undefined);
  // const [algaeActiveSide, setAlgaeActiveSide] = useState("intaking");//This is set between intaking, scoring, and result.
  // const [algaeStartTime, setAlgaeStartTime] = useState(0);
  // const [algaeEndTime, setAlgaeEndTime] = useState(0);

  // const [incapOn, setIncapOn] = useState(false);
  // const [incapStartTime, setIncapStartTime] = useState(0);

  // const [mobility, setMobility] = useState(false);

  useEffect(() => {
    const update = async () => {
      await dispatch(setStation({ station }));
      await dispatch(getStationData({ station }));
      await dispatch(sendHeartbeatAsync({ station, section: tab }));
      if(tab===Section.POSTMATCH){
        await dispatch(cleanForPostmatch());
      }
    };
    update();
    
    //If the bot is preloaded, sets the scoring event time to be when the tab was switched to auto and the intake location to preload.
    // UPDATE CYCLE (Client): Make sure the game piece that's preloaded is put here.
    if(tab===Section.AUTO&&scores.coralActiveSide=="level"&&scores.coralStartTime==0){
      dispatch(
        handleCoral({
          tab: Section.AUTO,
          phrase: "intaking",
          data: {
              intakeSelection: CoralIntakeLocation.AUTOPRELOAD
          }
        })
      );
    }
    
    //Skips the side selection from Auto if moving to another tab with it on.
    //This'll likely only be used if there's a variable you're not tracking in teleop. Probably comment this out.
    if(tab!==Section.AUTO&&scores.coralActiveSide=="side"){
      // setCoralActiveSide("result");
    }
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, station, tab]);

  useEffect(() => {
    setTab(Section.PREMATCH);
  }, [mainData.activeMatchName]);

  //triggers when incap button is pressed
  // const handleIncap = async () => {
  //   if(incapOn){
  //     const event = {
  //       timestampStarted: incapStartTime,
  //       timestampEnded: Date.now(),
  //       full: true
  //     }; //incapSegment creation.
  //     setIncapStartTime(0);
  //     setIncapOn(false);  

  //     await dispatch(sendIncapSegment(event));
  //   } else {
  //     setIncapStartTime(Date.now());
  //     setIncapOn(true);   
  //   }   
  // };

  //UPDATE CYCLE (Client): Make sure there's a handle_ and handle_Cancel for each game piece.
  // const handleCoral = async (
  //   phrase: string,
  //   data:{
  //     intakeSelection?: CoralIntakeLocation,
  //     scoringLevel?: CoralScoringLevel,
  //     dropped?: boolean,
  //     scoringSide?: CoralScoringSide,
  //     failedScoring?: boolean,
  //   },
  // ) => {
  //   if(phrase==coralActiveSide){
  //     if (phrase=="intaking"){
  //       if (coralStartTime == 0) setCoralStartTime(Date.now());
  //       setCoralIntakeLocation(data.intakeSelection);
  //       setCoralActiveSide("level");
  //     } else if (phrase=="level"){
  //       if(data.dropped){
  //         const event = {
  //           intakeLocation: coralIntakeLocation as CoralIntakeLocation,
  //           scoringLevel: undefined,
  //           scoringSide: undefined,
  //           failedScoring: true,
  //           dropped: true,
  //           timestampPickedUp: coralStartTime,
  //           timestampScored: Date.now(),
  //         }; //teleopScoringEvent creation.
  //         setCoralIntakeLocation(undefined);
  //         setCoralStartTime(0);
  //         setCoralActiveSide("intaking");
    
  //         await dispatch(sendCoralEvent(event));
  //       } else {
  //         if (coralEndTime == 0) setCoralEndTime(Date.now());
  //         setCoralScoringLevel(data.scoringLevel);
  //         if(tab==Section.AUTO){
  //           setCoralActiveSide("side"); 
  //         } else {
  //           setCoralActiveSide("result"); 
  //         }
  //       }
  //     } else if (phrase == "side") {
  //       setCoralScoringSide(data.scoringSide);
  //       setCoralActiveSide("result");   
  //     } else if (phrase == "result") {
  //       const event = {
  //         intakeLocation: coralIntakeLocation as CoralIntakeLocation,
  //         scoringLevel: coralScoringLevel as CoralScoringLevel,
  //         scoringSide: coralScoringSide as CoralScoringSide,
  //         failedScoring: data.failedScoring,
  //         dropped: false,
  //         timestampPickedUp: coralStartTime,
  //         timestampScored: coralEndTime,
  //       }; //teleopScoringEvent creation.
  //       setCoralIntakeLocation(undefined);
  //       setCoralScoringLevel(undefined);
  //       setCoralScoringSide(undefined);
  //       setCoralStartTime(0);
  //       setCoralEndTime(0);
  //       setCoralActiveSide("intaking");
  
  //       await dispatch(sendCoralEvent(event));
  //     }
  //   }
  // };
  // const handleCoralCancel = async (phrase: string) => {
  //   if(phrase==coralActiveSide){
  //     if (phrase=="level"){
  //       setCoralIntakeLocation(undefined);
  //       setCoralActiveSide("intaking");  
  //     } else if (phrase=="side"){
  //       setCoralScoringLevel(undefined);
  //       setCoralActiveSide("level");  
  //     } else if (phrase=="result"){
  //       if(tab==Section.AUTO){
  //         setCoralScoringSide(undefined);
  //         setCoralActiveSide("side"); 
  //       } else {
  //         setCoralScoringLevel(undefined);
  //         setCoralActiveSide("level"); 
  //       }
  //     }
  //   }
  // };

  // const handleAlgae = async (
  //   phrase: string,
  //   data:{
  //     intakeSelection?: AlgaeIntakeLocation,
  //     scoringLocation?: AlgaeScoringLocation,
  //     dropped?: boolean,
  //     failedScoring?: boolean,
  //   },
  // ) => {
  //   if(phrase==algaeActiveSide){
  //     if (phrase=="intaking"){
  //       if (algaeStartTime==0) setAlgaeStartTime(Date.now());
  //       setAlgaeIntakeLocation(data.intakeSelection);
  //       setAlgaeActiveSide("scoring");  
  //     } else if (phrase=="scoring"){
  //       if(data.dropped){
  //         const event = {
  //           intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
  //           scoringLocation: undefined,
  //           failedScoring: true,
  //           dropped: true,
  //           timestampPickedUp: algaeStartTime,
  //           timestampScored: Date.now(),
  //         }; //scoring event creation.
  //         setAlgaeIntakeLocation(undefined);
  //         setAlgaeStartTime(0);
  //         setAlgaeActiveSide("intaking");
    
  //         await dispatch(sendAlgaeEvent(event));
  //       } else {
  //         if (algaeEndTime == 0) setAlgaeEndTime(Date.now());
  //         setAlgaeScoringLocation(data.scoringLocation);
  //         setAlgaeActiveSide("result"); 
  //       }
  //     } else if (phrase == "result") {
  //       const event = {
  //         intakeLocation: algaeIntakeLocation as AlgaeIntakeLocation,
  //         scoringLocation: algaeScoringLocation as AlgaeScoringLocation,
  //         failedScoring: data.failedScoring,
  //         dropped: false,
  //         timestampPickedUp: algaeStartTime,
  //         timestampScored: algaeEndTime,
  //       }; //scoring event creation.
  //       setAlgaeIntakeLocation(undefined);
  //       setAlgaeScoringLocation(undefined);
  //       setAlgaeStartTime(0);
  //       setAlgaeEndTime(0);
  //       setAlgaeActiveSide("intaking");
  
  //       await dispatch(sendAlgaeEvent(event));
  //     }
  //   }
  // };
  // const handleAlgaeCancel = async (phrase: string) => {
  //   if(phrase==algaeActiveSide){
  //     if (phrase=="scoring"){
  //       setAlgaeIntakeLocation(undefined);
  //       setAlgaeActiveSide("intaking");  
  //     } else if (phrase=="result"){
  //       setAlgaeScoringLocation(undefined);
  //       setAlgaeActiveSide("scoring"); 
  //     }
  //   }
  // };

  const pressedKeys = useRef(new Set<string>());
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Add the key to the pressedKeys set
      pressedKeys.current.add(e.key);

      //UPDATE CYCLE (Client): Each cancel button should be mapped to a key.
      if (e.key=='s') {
        dispatch(handleCoralCancel({tab: tab, phrase: scores.coralActiveSide}));
      }
      if (e.key=='g') {
        dispatch(handleAlgaeCancel({phrase: scores.algaeActiveSide}));
      }
    };
      const handleKeyup = (e: KeyboardEvent) => {
          // Remove the key from the pressedKeys set when released
          pressedKeys.current.delete(e.key);
      };
      // Attach event listeners for keydown and keyup
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('keyup', handleKeyup);
      // Cleanup event listeners on component unmount
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
      };
  });

  const ready = mainData.scouter.name
    && mainData.activeTeamNumber &&
    mainData.activeMatchName;

  useEffect(() => {
    if (!mainData.submitted&&ready) dispatch(clearEvents({ }));
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
          <li className="vh-1 d-flex justify-content-center mt-1">1. Set an active match. </li>
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
              {/* You'll have to go into each tab to look at everything. */}
              {/* UPDATE CYCLE (Client): MAny variables defined here are passed into these components; make sure those are set. */}
                <PrematchContent
                  show={tab === Section.PREMATCH}
                  coralActiveSide={scores.coralActiveSide}
                  handlePreload={()=>{
                    if(scores.coralActiveSide=="level"){
                      dispatch(setCoralActiveSide({ coralActiveSide: "intaking" }));  
                    } else dispatch(setCoralActiveSide({ coralActiveSide: "level" }));  
                  }}
                />
                <AutoContent
                  show={tab === Section.AUTO}
                  coralActiveSide={scores.coralActiveSide}
                  coralIntakeLocation={scores.coralIntakeLocation}
                  coralScoringLevel={scores.coralScoringLevel}
                  coralScoringSide={scores.coralScoringSide}
                  // handleCoral={handleCoral}
                  // handleCoralCancel={handleCoralCancel}
                  algaeActiveSide={scores.algaeActiveSide}
                  algaeIntakeLocation={scores.algaeIntakeLocation}
                  algaeScoringLocation={scores.algaeScoringLocation}
                  // handleAlgae={handleAlgae}
                  // handleAlgaeCancel={handleAlgaeCancel}
                  incapOn={scores.incapOn}
                  // handleIncap={handleIncap}
                  mobility={scores.leftStartingZone}
                  // handleMobility={async () => {
                  //   setMobility(!mobility);
                  //   dispatch(setLeftStartingZoneAsync({leftStartingZone: mobility}));
                  // }}
                />
                <TeleopContent
                  show={tab === Section.TELEOP}
                  coralActiveSide={scores.coralActiveSide}
                  coralScoringLevel={scores.coralScoringLevel}
                  coralIntakeLocation={scores.coralIntakeLocation}
                  // handleCoral={handleCoral}
                  // handleCoralCancel={handleCoralCancel}
                  algaeActiveSide={scores.algaeActiveSide}
                  algaeIntakeLocation={scores.algaeIntakeLocation}
                  algaeScoringLocation={scores.algaeScoringLocation}
                  // handleAlgae={handleAlgae}
                  // handleAlgaeCancel={handleAlgaeCancel}
                  incapOn={scores.incapOn}
                  // handleIncap={handleIncap}
                />
                <PostmatchContent
                  show={tab === Section.POSTMATCH}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
