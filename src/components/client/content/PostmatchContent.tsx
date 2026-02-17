
Postmatchcontent · TSX
"use client";

import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import {
  updateScoreFieldAsync,
  sendPostMatchData,
  cancelScore,
  cleanForPostmatch,
} from "@/redux/scoresSlice";
import { Playstyle, Result } from "@prisma/client";
import DriverSkillSelector from "../postmatch/DriverSkillSelector";
import ToggleBox from "../postmatch/ToggleBox";
import CommentsBox from "../postmatch/CommentsBox";
import SubmitButton from "../postmatch/SubmitButton";
import { useEffect, useRef } from "react";

interface Props {
  show: boolean;
}

//UPDATE CYCLE (Client): Postmatch scouting for the current game.
export default function PostmatchContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  const mainData = useSelector((state: ReduxState) => state.mainData);

  const cleanedRef = useRef(false);

  // Clean up any in-progress incap when entering postmatch
  useEffect(() => {
    if (show && !cleanedRef.current) {
      dispatch(cleanForPostmatch());
      cleanedRef.current = true;
    }
    if (!show) {
      cleanedRef.current = false;
    }
  }, [show, dispatch]);

  return (
    <div className={`${!show && "d-none"}`}>
      {/* Driver Skill Rating */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={8}>
          <h5>Driver Skill Rating</h5>
          <DriverSkillSelector
            rating={scores.driverSkillRating}
            handleSelection={(rating: number) =>
              dispatch(updateScoreFieldAsync({ field: "driverSkillRating", value: rating }))
            }
          />
        </Col>
      </Row>

      {/* Playstyle */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={8}>
          <h5>Playstyle</h5>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {(["ALL_OFFENSE", "ALL_DEFENSE", "MIXED"] as Playstyle[]).map((style) => (
              <Button
                key={style}
                variant={scores.playstyle === style ? "primary" : "outline-primary"}
                onClick={() => dispatch(updateScoreFieldAsync({ field: "playstyle", value: style }))}
              >
                {style.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Toggles */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center gap-3" md={6}>
          <ToggleBox
            name="Played Defense"
            enabled={scores.playedDefense || false}
            handleClick={() =>
              dispatch(updateScoreFieldAsync({ field: "playedDefense", value: !scores.playedDefense }))
            }
          />
          <ToggleBox
            name="Defense Played Against"
            enabled={scores.defensePlayedAgainst || false}
            handleClick={() =>
              dispatch(updateScoreFieldAsync({ field: "defensePlayedAgainst", value: !scores.defensePlayedAgainst }))
            }
          />
          <ToggleBox
            name="Robot Broke Down"
            enabled={scores.robotBrokeDown || false}
            handleClick={() =>
              dispatch(updateScoreFieldAsync({ field: "robotBrokeDown", value: !scores.robotBrokeDown }))
            }
          />
        </Col>
      </Row>

      {/* Match Result */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex flex-column align-items-center" md={8}>
          <h5>Match Result</h5>
          <div className="d-flex gap-2">
            {([
              { value: "WIN" as Result, color: "success" },
              { value: "TIE" as Result, color: "info" },
              { value: "LOSS" as Result, color: "danger" },
            ]).map(({ value, color }) => (
              <Button
                key={value}
                variant={scores.result === value ? color : `outline-${color}`}
                className="px-4 py-2 fs-5 flex-grow-1"
                onClick={() => dispatch(updateScoreFieldAsync({ field: "result", value }))}
              >
                {value}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Comments */}
      <Row className="d-flex justify-content-center my-3">
        <Col md={8}>
          <CommentsBox
            comments={scores.comments || ""}
            handleChange={(comments: string) =>
              dispatch(updateScoreFieldAsync({ field: "comments", value: comments }))
            }
          />
        </Col>
      </Row>

      {/* Submit / Cancel */}
      <Row className="d-flex justify-content-center my-3">
        <Col className="d-flex justify-content-center gap-3" md={8}>
          <Button
            variant="danger"
            className="px-4 py-2 fs-5"
            onClick={() => dispatch(cancelScore({}))}
          >
            Cancel
          </Button>
          <SubmitButton
            handleSubmit={() =>
              dispatch(
                sendPostMatchData({
                  driverSkillRating: scores.driverSkillRating || 0,
                  playstyle: scores.playstyle,
                  playedDefense: scores.playedDefense || false,
                  defensePlayedAgainst: scores.defensePlayedAgainst || false,
                  robotBrokeDown: scores.robotBrokeDown || false,
                  result: scores.result || ("WIN" as Result),
                  comments: scores.comments || "",
                })
              )
            }
          />
        </Col>
      </Row>
    </div>
  );
}