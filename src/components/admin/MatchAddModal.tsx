import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import TeamDropdown from "./TeamDropdown";
import { Team } from "@/lib/enums";

interface Props {
  show: boolean;
  showMatchNumber: boolean;
  initialMatch?: number;
  initialRed1?: number;
  initialRed2?: number;
  initialRed3?: number;
  initialBlue1?: number;
  initialBlue2?: number;
  initialBlue3?: number;
  submitVar: string;
  teams: Team[];
  handleClose: () => void;
  handleSubmit: ({
    number,
    red1,
    red2,
    red3,
    blue1,
    blue2,
    blue3,
  }: {
    number: number;
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
  initialMatch,
  initialRed1,
  initialRed2,
  initialRed3,
  initialBlue1,
  initialBlue2,
  initialBlue3,
  submitVar,
  show,
  handleClose,
  handleSubmit,
}: Props) {
  const [match, setMatch] = useState<number | undefined>(undefined);
  const [red1, setRed1] = useState<number | undefined>(undefined);
  const [red2, setRed2] = useState<number | undefined>(undefined);
  const [red3, setRed3] = useState<number | undefined>(undefined);
  const [blue1, setBlue1] = useState<number | undefined>(undefined);
  const [blue2, setBlue2] = useState<number | undefined>(undefined);
  const [blue3, setBlue3] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false); //I put a small loading animation jsut for user feedback.

  //load function to set the initial values of the edit version of this modal
  useEffect(() => {
    setMatch(initialMatch || undefined);
    setRed1(initialRed1 || undefined);
    setRed2(initialRed2 || undefined);
    setRed3(initialRed3 || undefined);
    setBlue1(initialBlue1 || undefined);
    setBlue2(initialBlue2 || undefined);
    setBlue3(initialBlue3 || undefined);
  }, [initialMatch, initialRed1, initialRed2, initialRed3, initialBlue1, initialBlue2, initialBlue3]);

  //clean-up function for when this modal is closed.
  function clearState(){
    setMatch(undefined);
    setRed1(undefined);
    setRed2(undefined);
    setRed3(undefined);
    setBlue1(undefined);
    setBlue2(undefined);
    setBlue3(undefined);
  }

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
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
          {showMatchNumber && (
            <Form.Group className="mb-3">
            <Form.Label>Match Number</Form.Label>
            <Form.Control
              placeholder="e.g. 1"
              value={match}
              type="number"
              onChange={(e) => setMatch(Number(e.target.value))}
            />
          </Form.Group>
          )}
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
          variant="danger"
          onClick={() => clearState()}
        >
          Cancel
        </Button>
        <Button
          variant={submitVar}
          onClick={() =>
            {
              clearState();
              setLoading(true);
              handleSubmit({
                number: Number(match),
                red1: Number(red1),
                red2: Number(red2),
                red3: Number(red3),
                blue1: Number(blue1),
                blue2: Number(blue2),
                blue3: Number(blue3),
              });
              setLoading(false);
            }
          }
        >
          {showMatchNumber?"Save changes":"Create Match"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
