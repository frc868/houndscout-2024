"use client";
//You found it! (lame joke punchline)

//The page info for every client page.
import SectionSelector from "@/components/client/common/SectionSelector";
import StatusBar from "@/components/client/common/StatusBar";
import { CoralIntakeLocation, AlgaeIntakeLocation, CoralScoringLevel, AlgaeScoringLocation, CoralScoringSide } from "@prisma/client";
import { useEffect, useState, useRef } from "react";
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

// Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const prematchTabRef = useRef<HTMLButtonElement | null>(null);
const autoTabRef = useRef<HTMLButtonElement | null>(null);
const teleopTabRef = useRef<HTMLButtonElement | null>(null);
const postmatchTabRef = useRef<HTMLButtonElement | null>(null);
const side1Ref = useRef<HTMLButtonElement | null>(null);
const side2Ref = useRef<HTMLButtonElement | null>(null);
const side3Ref = useRef<HTMLButtonElement | null>(null);
const side4Ref = useRef<HTMLButtonElement | null>(null);
const side5Ref = useRef<HTMLButtonElement | null>(null);
const side6Ref = useRef<HTMLButtonElement | null>(null);
const coralScoreRef = useRef<HTMLButtonElement | null>(null);
const coralFailRef = useRef<HTMLButtonElement | null>(null);
const algaeScoreRef = useRef<HTMLButtonElement | null>(null);
const algaeFailRef = useRef<HTMLButtonElement | null>(null);
const pressedKeys = useRef(new Set<string>());

useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();

    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);

    // Shifts tab to the next entry if possible
    if (pressedKeys.current.has('Tab')) {
      // Check if buttonRef.current is not null
      if (tab==Section.PREMATCH){
        if (autoTabRef.current) {
          autoTabRef.current.click();
        }
      } else if (tab==Section.AUTO){
        if (teleopTabRef.current) {
          teleopTabRef.current.click();
        }
      } else if (tab==Section.TELEOP){
        if (postmatchTabRef.current) {
          postmatchTabRef.current.click();
        }
      } else if (tab==Section.POSTMATCH){
        if (prematchTabRef.current) {
          prematchTabRef.current.click();
        }
      }
    }

    // Presses the the coral scoring side 1 button if active
    if (pressedKeys.current.has('1')) {
      // Check if buttonRef.current is not null
      if (side1Ref.current) {
        side1Ref.current.click();
      }
    }
    // Presses the the coral scoring side 2 button if active
    if (pressedKeys.current.has('2')) {
      // Check if buttonRef.current is not null
      if (side2Ref.current) {
        side2Ref.current.click();
      }
    }
    // Presses the the coral scoring side 3 button if active
    if (pressedKeys.current.has('3')) {
      // Check if buttonRef.current is not null
      if (side3Ref.current) {
        side3Ref.current.click();
      }
    }
    // Presses the the coral scoring side 4 button if active
    if (pressedKeys.current.has('4')) {
      // Check if buttonRef.current is not null
      if (side4Ref.current) {
        side4Ref.current.click();
      }
    }
    // Presses the the coral scoring side 5 button if active
    if (pressedKeys.current.has('5')) {
      // Check if buttonRef.current is not null
      if (side5Ref.current) {
        side5Ref.current.click();
      }
    }
    // Presses the the coral scoring side 6 button if active
    if (pressedKeys.current.has('6')) {
      // Check if buttonRef.current is not null
      if (side6Ref.current) {
        side6Ref.current.click();
      }
    }

    // Presses the the coral score button if active
    if (pressedKeys.current.has('Q')) {
      // Check if buttonRef.current is not null
      if (coralScoreRef.current) {
        coralScoreRef.current.click();
      }
    }
    // Presses the the coral fail button if active
    if (pressedKeys.current.has('Z')) {
      // Check if buttonRef.current is not null
      if (coralFailRef.current) {
        coralFailRef.current.click();
      }
    }

    // Presses the the algae score button if active
    if (pressedKeys.current.has('Y')) {
      // Check if buttonRef.current is not null
      if (algaeScoreRef.current) {
        algaeScoreRef.current.click();
      }
    }
    // Presses the the coral fail button if active
    if (pressedKeys.current.has('N')) {
      // Check if buttonRef.current is not null
      if (algaeFailRef.current) {
        algaeFailRef.current.click();
      }
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
}, []);

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
                  handleIncap={handleIncap}
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
                  handleIncap={handleIncap}
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
