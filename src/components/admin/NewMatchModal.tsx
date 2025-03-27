import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import TeamDropdown from "../TeamDropdown";
import { Team } from "@/lib/enums";

interface Props {
  show: boolean;
  showMatchNumber: boolean;
  submitVar: string;
  teams: Team[];
  handleClose: () => void;
  handleSubmit: ({
    number,
    level,
    red1,
    red2,
    red3,
    blue1,
    blue2,
    blue3,
  }: {
    number: number;
    level: string;
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number;
  }) => void;
}

//A form to add a new match or edit an existing one.
export default function MatchAddModal({
  teams,
  showMatchNumber,
  submitVar,
  show,
  handleClose,
  handleSubmit,
}: Props) {
  const [matchLv, setMatchLv] = useState<string | undefined>("qm");
  const [matchNum, setMatchNum] = useState<number | undefined>(undefined);
  const [red1, setRed1] = useState<number | undefined>(undefined);
  const [red2, setRed2] = useState<number | undefined>(undefined);
  const [red3, setRed3] = useState<number | undefined>(undefined);
  const [blue1, setBlue1] = useState<number | undefined>(undefined);
  const [blue2, setBlue2] = useState<number | undefined>(undefined);
  const [blue3, setBlue3] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false); //I put a small loading animation jsut for user feedback.

  //load function to set the initial values of the edit version of this modal
  useEffect(() => {
    setMatchNum(undefined);
    setMatchLv("qm")
    setRed1(undefined);
    setRed2(undefined);
    setRed3(undefined);
    setBlue1(undefined);
    setBlue2(undefined);
    setBlue3(undefined);
  }, []);

  //clean-up function for when this modal is closed.
  function clearState(){
    setMatchLv("qm");
    setMatchNum(undefined);
    setRed1(undefined);
    setRed2(undefined);
    setRed3(undefined);
    setBlue1(undefined);
    setBlue2(undefined);
    setBlue3(undefined);
    handleClose();
  }

  return (
    <Modal centered show={show} size="lg" onHide={clearState}>
      <Modal.Header closeButton>
        <Modal.Title>{submitVar=="success"?"Add New":"Edit"} Match</Modal.Title>
        <MoonLoader
          className="mx-2"
          color={"black"}
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Modal.Header>

      <Modal.Body>
        <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Competition Level</Form.Label>
              <Form.Control
                as="select"
                value={matchLv}
                onChange={(e) => setMatchLv(String(e.target.value))} // Updates drivetrain on selection
              >
                <option value={"qm"}>Qualification Match</option>
                <option value={"pm"}>Practice Match</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Match Number</Form.Label>
              <Form.Control
                placeholder="e.g. 1"
                value={matchNum}
                type="number"
                onChange={(e) => setMatchNum(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 1</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={Number(red1)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setRed1(number)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 2</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={Number(red2)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setRed2(number)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 3</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={Number(red3)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setRed3(number)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 1</Form.Label>
                <TeamDropdown
                  red={false}
                  activeTeam={Number(blue1)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setBlue1(number)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 2</Form.Label>
                <TeamDropdown
                  red={false}
                  activeTeam={Number(blue2)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setBlue2(number)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 3</Form.Label>
                <TeamDropdown
                  red={false}
                  activeTeam={Number(blue3)}
                  teams={teams as Team[]}
                  handleTeamSelect={(number) => setBlue3(number)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant={submitVar}
          onClick={() =>{
            if (matchNum==undefined||red1==undefined||red2==undefined||red3==undefined||blue1==undefined||blue2==undefined||blue3==undefined) {
              alert("Form is incomplete. Cannot submit.");
            } else {
              setLoading(true);
              handleSubmit({
                number: Number(matchNum),
                level: String(matchLv),
                red1: Number(red1),
                red2: Number(red2),
                red3: Number(red3),
                blue1: Number(blue1),
                blue2: Number(blue2),
                blue3: Number(blue3),
              });
              clearState();
              setLoading(false);
            }
          }}
        >
          {showMatchNumber?"Create Match":"Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
