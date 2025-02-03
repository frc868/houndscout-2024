"use client";
//Quick tip, you can ctrl+click on something from another file to go directly there.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Form } from "react-bootstrap";
import SubmitButton from "@/components/client/postmatch/SubmitButton";
import TeamDropdown from "@/components/admin/TeamDropdown";
import ToggleBox from "@/components/client/postmatch/ToggleBox";
import SidewaysToggleBox from "@/components/client/mini/SidewaysToggleBox";
import StatusBar from "@/components/client/common/StatusBar";
import CommentsBox from "@/components/client/postmatch/CommentsBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Event } from "@prisma/client";
import {
  Match,
  Scouter,
  Team
} from "@/lib/enums";
import { Result } from "@prisma/client";
import { getEventTeamsAsync } from "@/redux/adminDataSlice";
import { getActiveEventAsync } from "@/redux/mainDataSlice";

export default function Pit() {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const adminData = useSelector((state: ReduxState) => state.adminData);

  useEffect(() => {
      const interval = setInterval(async () => {
        await dispatch(getActiveEventAsync());
  
        mainData.activeEvent?.code &&
          (await dispatch(
            getEventTeamsAsync({ eventCode: mainData.activeEvent?.code })
          ));
      }, 1000);
      return () => clearInterval(interval);
    }, [dispatch, mainData.activeEvent?.code, mainData.activeMatchName, mainData.blueOnLeft]);

  // State hooks to manage form data for different robot attributes
  const [teamNumber, setTeamNumber] = useState<number | undefined>(undefined);
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

  const ready = mainData.activeEvent?.code && adminData.eventTeams;

  //A form that's filled out after the match with supplementary info.
  //Based off of a layout provided by Michael and (possibly) ChatGPT.
  return (
    <>
      <StatusBar isConnected={true} />
      <h1 className="d-flex justify-content-center mt-5">Pit Scouting Form (WIP)</h1>
      <Row className="d-flex justify-content-center">
        {ready ? (
          <div className="d-flex justify-content-center mt-5">
            <h3>Team Number: </h3>
            <TeamDropdown
              red={false}
              activeTeam={Number(teamNumber)}
              teams={adminData.eventTeams as Team[]}
              handleTeamSelect={(number) => setTeamNumber(number)}
            />
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center mt-5">
              <h3>Loading... (Requires an active Event and a at least Team in the event)</h3>
            </div>
          </>
        )} 
      </Row>
      <Row className="my-5">
        <Col className="d-flex justify-content-start mx-5" md={4}>
{/*           Probably going to make a dropdown component to save space. */}
          <Form.Group className="d-flex flex-column align-items-center" controlId="drivetrain">
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

        <Col className="d-flex justify-content-center" md={5}>
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
        
        <Col className="d-flex justify-content-end" md={5}>
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
        <Col className="d-flex justify-content-start" md={5}>
          <h3>Intake: Can...</h3>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Intake Coral from Ground"
              checked={canIntakeGroundCoral}
              onChange={() => setCanIntakeGroundCoral(!canIntakeGroundCoral)}
            />
            <Form.Check
              type="checkbox"
              label="Intake Coral from Station"
              checked={canIntakeStationCoral}
              onChange={() => setCanIntakeStationCoral(!canIntakeStationCoral)}
            />
            <Form.Check
              type="checkbox"
              label="Intake Algae from Ground"
              checked={canIntakeGroundAlgae}
              onChange={() => setCanIntakeGroundAlgae(!canIntakeGroundAlgae)}
            />
            <Form.Check
              type="checkbox"
              label="Intake Algae from Reef"
              checked={canIntakeReefAlgae}
              onChange={() => setCanIntakeReefAlgae(!canIntakeReefAlgae)}
            />
            <Form.Check
              type="checkbox"
              label="Remove Algae from Reef without Intaking"
              checked={canRemoveReefAlgaeWithoutIntake}
              onChange={() => setCanRemoveReefAlgaeWithoutIntake(!canRemoveReefAlgaeWithoutIntake)}
            />
          </Form.Group>
        </Col>
    
        <Col className="d-flex justify-content-center" md={5}>
          <h3>Can Score In...</h3>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Reef L1"
              checked={canScoreReefL1}
              onChange={() => setCanScoreReefL1(!canScoreReefL1)}
            />
            <Form.Check
              type="checkbox"
              label="Reef L2"
              checked={canScoreReefL2}
              onChange={() => setCanScoreReefL2(!canScoreReefL2)}
            />
            <Form.Check
              type="checkbox"
              label="Reef L3"
              checked={canScoreReefL3}
              onChange={() => setCanScoreReefL1(!canScoreReefL3)}
            />
            <Form.Check
              type="checkbox"
              label="Reef L4"
              checked={canScoreReefL4}
              onChange={() => setCanScoreReefL1(!canScoreReefL4)}
            />
            <Form.Check
              type="checkbox"
              label="Net"
              checked={canScoreNet}
              onChange={() => setCanScoreNet(!canScoreNet)}
            />
            <Form.Check
              type="checkbox"
              label="Processor"
              checked={canScoreProcessor}
              onChange={() => setCanScoreProcessor(!canScoreProcessor)}
            />
          </Form.Group>
        </Col>

        <Col className="d-flex justify-content-end" md={2}>
          <h3>Endgame: Can...</h3>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Park under Net"
              checked={canPark}
              onChange={() => setCanPark(!canPark)}
            />
            <Form.Check
              type="checkbox"
              label="Hang on Shallow Cage"
              checked={canShallow}
              onChange={() => setCanShallow(!canShallow)}
            />
            <Form.Check
              type="checkbox"
              label="Hang on Deep Cate"
              checked={canDeep}
              onChange={() => setCanDeep(!canDeep)}
            />
          </Form.Group>
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
          {/* <Form.Control type="file" accept="image/*" onChange={handleFileChange} /> */}
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
    </>
  );
}
