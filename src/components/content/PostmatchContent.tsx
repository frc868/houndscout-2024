"use client";

import CommentsBox from "@/components/postmatch/CommentsBox";
import DriverSkillSelector from "@/components/postmatch/DriverSkillSelector";
import SubmitButton from "@/components/postmatch/SubmitButton";
import ToggleBox from "@/components/postmatch/ToggleBox";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function PostmatchContent() {
  const [driverSkillSelection, setDriverSkillSelection] = useState<
    number | null
  >(null);
  const [playedDefense, setPlayedDefense] = useState(false);
  const [underHeavyDefense, setUnderHeavyDefense] = useState(false);
  const [comments, setComments] = useState("");

  return (
    <>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={4}>
          <DriverSkillSelector
            selected={driverSkillSelection as number}
            handleSelection={setDriverSkillSelection}
          />
        </Col>
        <Col className="d-flex justify-content-center" md={4}>
          <ToggleBox
            name="Played Defense?"
            enabled={playedDefense}
            handleClick={() =>
              setPlayedDefense((playedDefense) => !playedDefense)
            }
          />
        </Col>
        <Col className="d-flex justify-content-start" md={4}>
          <ToggleBox
            name="Under Heavy Defense?"
            enabled={underHeavyDefense}
            handleClick={() =>
              setUnderHeavyDefense((underHeavyDefense) => !underHeavyDefense)
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
          <SubmitButton />
        </Col>
      </Row>
    </>
  );
}
