"use client";

import TeleopIntakePanel from "@/components/client/teleop/TeleopIntakePanel";
import TeleopScoringPanel from "@/components/client/teleop/TeleopScoringPanel";
import { AppDispatch, ReduxState } from "@/redux/store";
import { EndgameType } from "@prisma/client";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EndgamePanel from "@/components/client/teleop/EndgamePanel";
import {
  setEndgameTypeAsync,
  setEndgameSuccessAsync,
} from "@/redux/scoresSlice";
import MiniToggleBox from "../mini/MiniToggleBox";

interface Props {
  show: boolean;
  incapOn: boolean;
}

//Teleop tab.
//Most of this stuff will probably be copied onto the new auton page, and duplicated for each game piece.
export default function TeleopContent({ show, incapOn }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);


  return (
    <div className={`${!show && "d-none"}`}>
      { /* We're probably going to redo this layout, but keep a copy of it for future reference.  */ }
      <Row className="my-5">
        <Col className="d-flex justify-content-start ms-5" md={4}>
          <EndgamePanel
          //Endgame content.
            endgameType={scores.endgameType}
            endgameSuccess={scores.endgameSuccess}
            handleEndgameTypeSelection={async (endgameType) =>
              await dispatch(setEndgameTypeAsync({ endgameType }))
            }
            handleSuccessSelection={async (endgameSuccess) =>
              await dispatch(setEndgameSuccessAsync({ endgameSuccess }))
            }
          />
        </Col>
      </Row>
    </div>
  );
}
