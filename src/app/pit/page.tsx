"use client";
//Quick tip, you can ctrl+click on something from another file to go directly there.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import AdminStatusBar from "@/components/admin/AdminStatusBar";
import DriverSkillSelector from "@/components/client/postmatch/DriverSkillSelector";
import ResultSelector from "@/components/client/postmatch/ResultSelector";
import SubmitButton from "@/components/client/postmatch/SubmitButton";
import ToggleBox from "@/components/client/postmatch/ToggleBox";
import CommentsBox from "@/components/client/postmatch/CommentsBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Event } from "@prisma/client";
import {
  Match,
  Scouter,
  Team
} from "@/lib/enums";
import { Result } from "@prisma/client";

export default function Pit() {
  const dispatch = useDispatch<AppDispatch>();
    //team number
    //drivetrain type (swerve, tank, mecanum, other)
    //wheel type (colsuns, black nitrite, blue nitrite, tpy, white andymark, mecanum)
    //intake type
    //weight
    //auton?
    //picture
    //able to intake coral from ground
    //able to intake coral from station
    //able to intake algae from ground
    //able to intake algae from reef
    //able to remove algae from reef without intaking
    //able to score in reef L1
    //able to score in reef L2
    //able to score in reef L3
    //able to score in reef L4
    //able to score in processor
    //able to score in net
    //able to climb shallow
    //able to climb deep
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
    <div>
      <Row className="my-5">
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
      <Row className="d-flex justify-content-center mt-5">
        <Col md={3}>
          <SubmitButton
            handleClick={()=>{}}
            // handleClick={async () => {
            //   dispatch(
            //     sendPostMatchData({
            //       driverSkillRating: driverSkillRating as number,
            //       result: result as Result,
            //       playedDefense,
            //       comments,
            //     })
            //   );
            //   handleSubmit();
            // }}
          />
        </Col>
      </Row>
    </div>
  );
}
