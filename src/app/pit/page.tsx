"use client";
//Quick tip, you can ctrl+click on something from another file to go directly there.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import AdminStatusBar from "@/components/admin/AdminStatusBar";
import SubmitButton from "@/components/client/postmatch/SubmitButton";
import ToggleBox from "@/components/client/postmatch/ToggleBox";
import SidewaysToggleBox from "@/components/client/mini/SidewaysToggleBox";
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
  
  // State hooks to manage form data for different robot attributes
  const [teamNumber, setTeamNumber] = useState<number | null>(null);
  const [drivetrain, setDrivetrain] = useState<string>("");
  const [wheelType, setWheelType] = useState<string>("");
  const [intakeType, setIntakeType] = useState<string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [auton, setAuton] = useState<boolean>(false);
  const [comments, setComments] = useState(""); // Additional comments field

  const [canIntakeGroundCoral, setCanIntakeGroundCoral] = useState<boolean>(false);
  const [canIntakeStationCoral, setCanIntakeStationCoral] = useState<boolean>(false);
  const [canIntakeGroundAlgae, setCanIntakeGroundAlgae] = useState<boolean>(false);
  const [canIntakeReefAlgae, setCanIntakeReefAlgae] = useState<boolean>(false);
  const [canRemoveReefAlgaeWithoutIntake, setCanRemoveReefAlgaeWithoutIntake] = useState<boolean>(false);
  
  const [canScoreReefL1, setCanScoreReefL1] = useState<boolean>(false);
  const [canScoreReefL2, setCanScoreReefL2] = useState<boolean>(false);
  const [canScoreReefL3, setCanScoreReefL3] = useState<boolean>(false);
  const [canScoreReefL4, setCanScoreReefL4] = useState<boolean>(false);
  const [canScoreNet, setCanScoreNet] = useState<boolean>(false);
  const [canScoreProcessor, setCanScoreProcessor] = useState<boolean>(false);

  const [canPark, setCanPark] = useState<boolean>(false);
  const [canShallow, setCanShallow] = useState<boolean>(false);
  const [canDeep, setCanDeep] = useState<boolean>(false);

  //A form that's filled out after the match with supplementary info.
  //Based off of a layout provided by Michael and (possibly) ChatGPT.
  return (
    <div>
      <StatusBar isConnected={true} />
      <h1 className="d-flex justify-content-center>Pit Scouting Form (WIP)</h1>
      <Row className="d-flex justify-content-center mb-2">
{/*         May replace with TeamDropdown */}
        <Form.Group controlId="teamNumber">
          <Form.Label>Team Number</Form.Label>
          <Form.Control
            type="number"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)} // Updates team number on input change
          />
        </Form.Group>
      </Row>
      <Row className="my-2">
        <Col className="d-flex justify-content-start" md={2}>
{/*           Probably going to make a dropdown component to save space. */}
          <Form.Group controlId="drivetrain">
            <Form.Label>Drivetrain Type</Form.Label>
            <Form.Control
              as="select"
              value={drivetrain}
              onChange={(e) => setDrivetrain(e.target.value)} // Updates drivetrain on selection
            >
              <option value="">Select...</option>
              <option value="swerve">Swerve</option>
              <option value="tank">Tank</option>
              <option value="mecanum">Mecanum</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col className="d-flex justify-content-center" md={2}>
          <Form.Group controlId="wheelType">
            <Form.Label>Wheel Type</Form.Label>
            <Form.Control
              as="select"
              value={wheelType}
              onChange={(e) => setWheelType(e.target.value)} // Updates wheel type on selection
            >
              <option value="">Select...</option>
              <option value="colsuns">Colsuns</option>
              <option value="blackNitrite">Black Nitrite</option>
              <option value="blueNitrite">Blue Nitrite</option>
              <option value="tpy">TPY</option>
              <option value="whiteAndymark">White AndyMark</option>
              <option value="mecanum">Mecanum</option>
            </Form.Control>
          </Form.Group>
        </Col>
        
        <Col className="d-flex justify-content-end" md={2}>
          <Form.Group controlId="intakeType">
            <Form.Label>Intake Type</Form.Label>
            <Form.Control
              as="select"
              value={intakeType}
              onChange={(e) => setIntakeType(e.target.value)} // Updates intake type on selection
            >
              <option value="">Select...</option>
              <option value="mechanical">Mechanical</option>
              <option value="pneumatic">Pneumatic</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="my-2">
        <Col className="d-flex justify-content-start" md={2}>
{/*           I cannot currently verify this works, unfortunately. */}
          <h3>Intake: Can...</h3>
          <Form.Group>
            ["IntakeGroundCoral", "IntakeStationCoral", "IntakeGroundAlgae", "IntakeReefAlgae", "RemoveReefAlgaeWithoutIntake"].map((area)=>{
              <Form.Check
                type="checkbox"
                label={area.replace(/([A-Z])/g, " $1").trim()}//Adds spaces between each word
                checked={canScore{area}}
                onChange={() => setCan{area}(!can{area})}
              />
            })
          />
        </Col>
    
        <Col className="d-flex justify-content-start" md={2}>
{/*           I cannot currently verify this works, unfortunately. */}
          <h3>Can Score In...</h3>
          <Form.Group>
            ["ReefL1", "ReefL2", "ReefL3", "ReefL4", "Processor", "Net"].map((area)=>{
              <Form.Check
                type="checkbox"
                label={area.replace(/([A-Z])/g, " $1").trim()}//Adds spaces between each word
                checked={canScore{area}}
                onChange={() => setCanScore{area}(!canScore{area})}
              />
            })
          />
        </Col>

        <Col className="d-flex justify-content-start" md={2}>
{/*           I cannot currently verify this works, unfortunately. */}
          <h3>Endgame: Can...</h3>
          <Form.Group>
            ["Park", "Shallow", "Deep"].map((type)=>{
              <Form.Check
                type="checkbox"
                label={type}
                checked={can{type}}
                onChange={() => setCan{type}(!can{type})}
              />
            })
          />
        </Col>
      </Row>
      <Row className="my-2">
         <Col className="d-flex justify-content-start" md={4}>
          <Form.Group controlId="weight">
            <Form.Label>Weight (lbs)</Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)} // Updates weight on input change
            />
          </Form.Group>
        </Col>
        <Col className="d-flex justify-content-end" md={4}>
          <ToggleBox
            name="Has Auto Mode?"
            enabled={auton}
            handleClick={() =>
              setAuton((auton) => !auton)
            }
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center my-2">
{/*         Need to figure out how to store this image; I didn't get enough details on this. */}
        <Form.Group controlId="robotPicture">
          <Form.Label>Upload Robot Picture</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={3}>
          <CommentsBox contents={comments} handleChange={setComments} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-2">
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
