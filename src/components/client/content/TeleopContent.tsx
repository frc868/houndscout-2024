"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import { ClimbType, IntakeLocation, ScoringLocation } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TeleopStagePanel from "@/components/client/teleop/TeleopStagePanel";
import {
  sendTeleopEvent,
  setClimbTypeAsync,
  setNumberRobotsOnChainAsync,
  setScoredInTrapAsync,
  setSpotlitAsync,
} from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

export default function TeleopContent() {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  const [intakeLocation, setIntakeLocation] = useState<
    IntakeLocation | undefined
  >(undefined);
  const [activeSide, setActiveSide] = useState("intaking");

  const handleIntakeSelection = (selection: IntakeLocation) => {
    setIntakeLocation(selection);
    setActiveSide("scoring");
  };

  const handleScoringSelection = async (
    location?: ScoringLocation,
    failed?: boolean,
    dropped?: boolean
  ) => {
    if (activeSide == "scoring") {
      const event = {
        intakeLocation: intakeLocation as IntakeLocation,
        scoringLocation: location,
        failed,
        dropped,
      };
      setIntakeLocation(undefined);
      setActiveSide("intaking");

      await dispatch(sendTeleopEvent(event));
    }
  };

  return (
    <>
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
    </>
  );
}
