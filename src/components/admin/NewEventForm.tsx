import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
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

//The part of the EventManageModal that allows you to create a new event. Basically a form.
export default function NewEventForm({
  handleSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [week, setWeek] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <Row>
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
                  placeholder="e.g. 2025incar"
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
            <Form.Label>Event Location, City, State, and Country</Form.Label>
            <Form.Control
              placeholder="e.g. Carmel High School in Carmel, IN, USA"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Button
          variant="success"
          className="mt-2"
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
          Add Event
        </Button>
      </Row>
      <hr />
    </div>
  );
}
