"use client";

import CommentsBox from "@/components/client/postmatch/CommentsBox";
import DriverSkillSelector from "@/components/client/postmatch/DriverSkillSelector";
import ResultSelector from "@/components/client/postmatch/ResultSelector";
import SubmitButton from "@/components/client/postmatch/SubmitButton";
import ToggleBox from "@/components/client/postmatch/ToggleBox";
import { sendPostMatchData } from "@/redux/scoresSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Result } from "@prisma/client";

interface Props {
  show: boolean;
  handleSubmit: () => void;
}

export default function PostmatchContent({ show, handleSubmit }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [driverSkillRating, setDriverSkillRating] = useState<number | null>(
    null
  );
  const [result, setResult] = useState<Result>(
    Result.TIE
  );
  const [playedDefense, setPlayedDefense] = useState(false);
  const [underHeavyDefense, setUnderHeavyDefense] = useState(false);
  const [comments, setComments] = useState("");

  //A form that's filled out after the match with supplementary info.
  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="my-3">
        <Col className="d-flex justify-content-end" md={4}>
          <DriverSkillSelector
            selected={driverSkillRating as number}
            handleSelection={setDriverSkillRating}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={4}>
          <ResultSelector
            selected={result as Result}
            handleSelection={setResult}
          />
        </Col>
        <Col className="d-flex justify-content-start" md={4}>
          <ToggleBox
          //Basically a checkbox.
            name="Played Defense?"
            enabled={playedDefense}
            handleClick={() =>
              setPlayedDefense((playedDefense) => !playedDefense)
            }
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={3}>
          <CommentsBox contents={comments} handleChange={setComments} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={3}>
          <SubmitButton
            handleClick={async () => {
              dispatch(
                sendPostMatchData({
                  driverSkillRating: driverSkillRating as number,
                  result: result as Result,
                  playedDefense,
                  comments,
                })
              );
              handleSubmit();
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
