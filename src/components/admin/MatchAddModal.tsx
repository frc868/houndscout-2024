import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import TeamDropdown from "./TeamDropdown";
import { Team } from "@/redux/adminDataSlice";

interface Props {
  show: boolean;
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

export default function SignInModal({
  show,
  teams,
  handleClose,
  handleSubmit,
}: Props) {
  const [number, setNumber] = useState("");
  const [red1, setRed1] = useState("");
  const [red2, setRed2] = useState("");
  const [red3, setRed3] = useState("");
  const [blue1, setBlue1] = useState("");
  const [blue2, setBlue2] = useState("");
  const [blue3, setBlue3] = useState("");

  function clearState(){
    setRed1("");
    setRed2("");
    setRed3("");
    setBlue1("");
    setBlue2("");
    setBlue3("");
  }
  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Match</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Match Number</Form.Label>
            <Form.Control
              placeholder="e.g. 1"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 1</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={red1}
                  teams={teams}
                  handleTeamSelect={(number) => setRed1(number.toString())}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 2</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={red2}
                  teams={teams}
                  handleTeamSelect={(number) => setRed2(number.toString())}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 3</Form.Label>
                <TeamDropdown
                  red={true}
                  activeTeam={red3}
                  teams={teams}
                  handleTeamSelect={(number) => setRed3(number.toString())}
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
                  activeTeam={blue1}
                  teams={teams}
                  handleTeamSelect={(number) => setBlue1(number.toString())}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 2</Form.Label>
                <TeamDropdown
                  red={false}
                  activeTeam={blue2}
                  teams={teams}
                  handleTeamSelect={(number) => setBlue2(number.toString())}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 3</Form.Label>
                <TeamDropdown
                  red={false}
                  activeTeam={blue3}
                  teams={teams}
                  handleTeamSelect={(number) => setBlue3(number.toString())}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <p>To do: Change the team numbers to dropdowns</p>
        <Button
          variant="primary"
          onClick={() =>
            {
              clearState();
              handleSubmit({
                number: Number(number),
                red1: Number(red1),
                red2: Number(red2),
                red3: Number(red3),
                blue1: Number(blue1),
                blue2: Number(blue2),
                blue3: Number(blue3),
              });
            }
          }
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
