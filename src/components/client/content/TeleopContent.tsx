"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import { ClimbType, IntakeLocation, ScoringLocation } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TeleopStagePanel from "@/components/client/teleop/TeleopEndgamePanel";
import {
  sendTeleopEvent,
  setClimbTypeAsync,
  setNumberRobotsOnChainAsync,
  setScoredInTrapAsync,
  setSpotlitAsync,
} from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

interface Props {
  show: boolean;
}

//Teleop tab.
//Most of this stuff will probably be copied onto the new auton page, and duplicated for each game piece.
export default function TeleopContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);

  //UPDATE CYCLE: Make sure everything down to handleScoringSelection is duplicated if there's multiple game pieces.
  //Also ensure the enums used are accurate; those are imported from Prisma, so update those as well.
  const [intakeLocation, setIntakeLocation] = useState<
    IntakeLocation | undefined
  >(undefined);
  const [activeSide, setActiveSide] = useState("intaking");//This is set between intaking and scoring.
  
  //triggers when intake location is selected
  const handleIntakeSelection = (selection: IntakeLocation) => {
    //Add a timestamp creator at the first scoring input.
    setIntakeLocation(selection);
    setActiveSide("scoring");    
  };
  //triggers when scoring location is selected
  const handleScoringSelection = async (
    location?: ScoringLocation,
    failed?: boolean,
    dropped?: boolean
  ) => {
    if (activeSide == "scoring") {
      //Add a timestamp creator here or wherever the first scoring input is.
      const event = {
        intakeLocation: intakeLocation as IntakeLocation,
        scoringLocation: location,
        failedScoring,
        dropped,
        //Need to add timestampPickedUp and timestampScored here.
      }; //teleopScoringEvent creation.
      setIntakeLocation(undefined);
      setActiveSide("intaking");

      await dispatch(sendTeleopEvent(event));
    }
  };

  return (
    <div className={`${!show && "d-none"}`}>
      { /* We're probably going to redo this layout, but keep a copy of it for future reference.  */ }
      <Row></Row>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={3}>
          <TeleopIntakePanel
            selected={intakeLocation}
            handleSelection={handleIntakeSelection}
          />
        </Col>
        <Col className="d-flex justify-content-end" md={4}>
          <TeleopScoringPanel
            active={activeSide === "scoring"}
            handleSelection={handleScoringSelection}
          />
        </Col>
        <Col className="d-flex justify-content-start ms-5" md={4}>
          <TeleopStagePanel
          //Endgame content. May be moved to its own tab if necessary.
            climbType={scores.climbType}
            numRobots={scores.numberRobotsOnChain}
            scoredInTrap={scores.scoredInTrap}
            spotlit={scores.spotlit}
            handleClimbTypeSelection={async (climbType) =>
              await dispatch(setClimbTypeAsync({ climbType }))
            }
            handleNumRobotsSelection={async (numberRobotsOnChain) =>
              await dispatch(
                setNumberRobotsOnChainAsync({ numberRobotsOnChain })
              )
            }
            handleScoredInTrapSelection={async (scoredInTrap) =>
              await dispatch(setScoredInTrapAsync({ scoredInTrap }))
            }
            handleSpotlitSelection={async (spotlit) =>
              await dispatch(setSpotlitAsync({ spotlit }))
            }
          />
        </Col>
      </Row>
    </div>
  );
}
