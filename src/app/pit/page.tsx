/* eslint-disable @next/next/no-img-element */
"use client";
//Quick tip, you can ctrl+click on something from another file to go directly there.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Form } from "react-bootstrap";
import SubmitButton from "@/components/client/postmatch/SubmitButton";
import TeamDropdown from "@/components/TeamDropdown";
import SidewaysToggleBox from "@/components/client/mini/SidewaysToggleBox";
import StatusBar from "@/components/client/common/StatusBar";
import CommentsBox from "@/components/client/postmatch/CommentsBox";
import { Button, Col, Container, Row } from "react-bootstrap";
import { sendPitData } from "@/redux/scoresSlice";
import { Team } from "@/lib/enums";
import { getEventTeamsAsync } from "@/redux/adminDataSlice";
import { getActiveEventAsync } from "@/redux/mainDataSlice";
import { DrivetrainType, IntakeType, WheelType } from "@prisma/client";

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

  const [submitted, setSubmitted] = useState<boolean>(false); //Local state, no need to put this in the submission thunk.

  // State hooks to manage form data for different robot attributes
  const [teamNumber, setTeamNumber] = useState<number | undefined>(undefined);

  const [drivetrain, setDrivetrain] = useState<DrivetrainType|undefined>(undefined);
  const [wheels, setWheels] = useState<WheelType|undefined>(undefined);
  const [intake, setIntake] = useState<IntakeType|undefined>(undefined);
  const [weight, setWeight] = useState<number>(0);
  const [hasAuton, setHasAuton] = useState<boolean>(false);
  const [comments, setComments] = useState(""); // Additional comments field

  const [canIntakeGroundCoral, setCanIntakeGroundCoral] = useState<boolean>(false);
  const [canIntakeLollipopCoral, setCanIntakeLollipopCoral] = useState<boolean>(false);
  const [canIntakeStationCoral, setCanIntakeStationCoral] = useState<boolean>(false);
  const [canIntakeGroundAlgae, setCanIntakeGroundAlgae] = useState<boolean>(false);
  const [canIntakeLollipopAlgae, setCanIntakeLollipopAlgae] = useState<boolean>(false);
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

  
  const [robotImage, setRobotImage] = useState<string | null>(null); 

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); 
    setRobotImage(imageUrl);
    }
  };

  const ready = mainData.activeEvent?.code && adminData.eventTeams;

  //A form that's filled out after the match with supplementary info.
  //Based off of a layout provided by Michael.
  return (
    <>
      <StatusBar isConnected={true} />
      {submitted ? (
        <div className="d-flex justify-content-center align-items-center h-75 flex-column bg-success-subtle">
          <h1 className="display-1 fw-bold">Submitted successfully!</h1>
          <h1 className="mt-3">Please reload to submit another entry.</h1>
        </div>
      ) : (
        <>
          <h1 className="d-flex justify-content-center mt-1">Pit Scouting Form</h1>
          <Row className="d-flex justify-content-center">
            {ready ? (
              <div className="d-flex justify-content-center mt-3">
                <h3 className="mr-2">Team Number: </h3>
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
                  <h3>Loading... (Requires an active Event and at least one Team in that Event)</h3>
                </div>
              </>
            )} 
          </Row>

          <Row className="d-flex justify-content-center my-2">
            <Form.Group controlId="robotPicture">
              <Form.Label>Upload Robot Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Row>
          
          {robotImage && (
            <Row className="d-flex justify-content-center my-2">
              <Col md={6} className="d-flex justify-content-center">
                <img
                  src={robotImage}
                  alt="Robot"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Col>
            </Row>
          )}

          <Row className="my-5">
            <Col className="d-flex justify-content-center align-items-center" md={4}>
    {/*           Probably going to make a dropdown component to save space. */}
              <Form.Group controlId="drivetrain">
                <Form.Label>Drivetrain Type</Form.Label>
                <Form.Control
                  as="select"
                  value={drivetrain}
                  onChange={(e) => setDrivetrain(e.target.value as DrivetrainType|undefined)} // Updates drivetrain on selection
                >
                  <option value={undefined}>Select...</option>
                  {Object.keys(DrivetrainType).map((type) => {
                    return(
                      <option key={type} value={type}>{type}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col className="d-flex justify-content-center align-items-center" md={4}>
              <Form.Group controlId="wheelType">
                <Form.Label>Wheels</Form.Label>
                <Form.Control
                  as="select"
                  value={wheels}
                  onChange={(e) => setWheels(e.target.value as WheelType|undefined)} // Updates wheel type on selection
                >
                  <option value={undefined}>Select...</option>
                  {Object.keys(WheelType).map((type) => {
                    return(
                      <option key={type} value={type}>{type}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            
            <Col className="d-flex justify-content-center align-items-center" md={4}>
              <Form.Group controlId="intakeType">
                <Form.Label>Intake Type</Form.Label>
                <Form.Control
                  as="select"
                  value={intake}
                  onChange={(e) => setIntake(e.target.value as IntakeType|undefined)} // Updates intake type on selection
                >
                  <option value={undefined}>Select...</option>
                  {Object.keys(IntakeType).map((type) => {
                    return(
                      <option key={type} value={type}>{type}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="my-2">
            <Col className="d-flex flex-column justify-content-center align-items-center" md={4}>
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
                  label="Intake Coral from Lollipop"
                  checked={canIntakeLollipopCoral}
                  onChange={() => setCanIntakeLollipopCoral(!canIntakeLollipopCoral)}
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
                  label="Intake Algae from Lollipop"
                  checked={canIntakeLollipopAlgae}
                  onChange={() => setCanIntakeLollipopAlgae(!canIntakeLollipopAlgae)}
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
        
            <Col className="d-flex flex-column justify-content-center align-items-center" md={4}>
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
                  onChange={() => setCanScoreReefL3(!canScoreReefL3)}
                />
                <Form.Check
                  type="checkbox"
                  label="Reef L4"
                  checked={canScoreReefL4}
                  onChange={() => setCanScoreReefL4(!canScoreReefL4)}
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

            <Col className="d-flex flex-column justify-content-center align-items-center" md={4}>
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
                  label="Hang on Deep Cage"
                  checked={canDeep}
                  onChange={() => setCanDeep(!canDeep)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="d-flex justify-content-center" md={6}>
              <Form.Group controlId="weight">
                <Form.Label>Weight (lbs)</Form.Label>
                <Form.Control
                  type="number"
                  value={Number(weight)}
                  onChange={(e) => setWeight(Number(e.target.value))} // Updates weight on input change
                />
              </Form.Group>
            </Col>
            <Col className="d-flex justify-content-center" md={6}>
              <SidewaysToggleBox
                name="Has Auto Mode?"
                enabled={hasAuton}
                handleClick={() =>
                  setHasAuton((hasAuton) => !hasAuton)
                }
              />
            </Col>
          </Row>
          
          <Row className="d-flex justify-content-center">
            <Col md={3}>
              <CommentsBox contents={comments} handleChange={setComments} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-2">
            <Col md={3}>
              <SubmitButton
                handleClick={async () => {
                  if(!teamNumber){
                    alert("Please input a team number.");
                  }else{
                    dispatch(
                      sendPitData({
                        id: adminData.eventTeams?.filter((team)=>team.number==teamNumber)[0].id as number,
                        drivetrain: drivetrain as DrivetrainType,
                        wheels: wheels as WheelType,
                        intake: intake as IntakeType,
                        weight: weight as number,
                        hasAuton: hasAuton as boolean,
                        comments: comments as string,
                        robotImage: robotImage as string,
                        canIntakeGroundCoral: canIntakeGroundCoral as boolean,
                        canIntakeLollipopCoral: canIntakeLollipopCoral as boolean,
                        canIntakeStationCoral: canIntakeStationCoral as boolean,
                        canIntakeGroundAlgae: canIntakeGroundAlgae as boolean,
                        canIntakeLollipopAlgae: canIntakeLollipopAlgae as boolean,
                        canIntakeReefAlgae: canIntakeReefAlgae as boolean,
                        canRemoveReefAlgaeWithoutIntake: canRemoveReefAlgaeWithoutIntake as boolean,
                        canScoreReefL1: canScoreReefL1 as boolean,
                        canScoreReefL2: canScoreReefL2 as boolean,
                        canScoreReefL3: canScoreReefL3 as boolean,
                        canScoreReefL4: canScoreReefL4 as boolean,
                        canScoreNet: canScoreNet as boolean,
                        canScoreProcessor: canScoreProcessor as boolean,
                        canPark: canPark as boolean,
                        canShallow: canShallow as boolean,
                        canDeep: canDeep as boolean,
                      })
                    );
                    setSubmitted(true);
                  }
                }}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
