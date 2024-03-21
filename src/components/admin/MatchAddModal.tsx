import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  show: boolean;
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
              placeholder="1"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 1</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={red1}
                  onChange={(e) => setRed1(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 2</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={red2}
                  onChange={(e) => setRed2(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Red 3</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={red3}
                  onChange={(e) => setRed3(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 1</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={blue1}
                  onChange={(e) => setBlue1(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 2</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={blue2}
                  onChange={(e) => setBlue2(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Blue 3</Form.Label>
                <Form.Control
                  placeholder="0"
                  value={blue3}
                  onChange={(e) => setBlue3(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleSubmit({
              number: Number(number),
              red1: Number(red1),
              red2: Number(red2),
              red3: Number(red3),
              blue1: Number(blue1),
              blue2: Number(blue2),
              blue3: Number(blue3),
            })
          }
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
