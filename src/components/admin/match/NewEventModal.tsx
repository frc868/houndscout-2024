import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSubmit: ({
    name,
    code,
    week,
    start,
    end,
    address,
  }: {
    name: string;
    code: string;
    week: number;
    start: string;
    end: string;
    address: string;
  }) => void;
}

export default function NewEventModal({
  show,
  handleClose,
  handleSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [week, setWeek] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              placeholder="e.g. FIN Carmel event"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Event Code</Form.Label>
                <Form.Control
                  placeholder="e.g. ABCD"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Event Week</Form.Label>
                <Form.Control
                  type="number"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Event Address</Form.Label>
            <Form.Control
              placeholder="e.g. 520 E Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <p>Note: Non-functional, use patch in api/v1/events/[code]</p>
        <Button variant="secondary" className="bg-danger" onClick={handleClose}>
          Discard Changes
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleSubmit({
              name: String(name),
              code: String(code),
              week: Number(week),
              start: String(start),
              end: String(end),
              address: String(address)
            })
          }
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
