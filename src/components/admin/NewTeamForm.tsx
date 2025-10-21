import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  handleSubmit: ({
    number,
    name,
    location,
  }: {
    number: number
    name: string;
    location: string;
  }) => void;
}

//The part of the TeamManageModal that allows you to create a new team. Basically a form.
export default function NewTeamModal({
  handleSubmit,
}: Props) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div>
      <Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  placeholder="e.g. TechHOUNDS"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Team Number</Form.Label>
                <Form.Control
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-1">
            <Form.Label>Team Home City, State, and Country (optional)</Form.Label>
            <Form.Control
              placeholder="e.g. Carmel, Indiana, USA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>

      <Row>
        <Button
          variant="success"
          className="mt-2"
          onClick={() => {
            if (number==""||name=="") {
              alert("Form is incomplete. Cannot submit.");
            } else {
              handleSubmit({
                number: Number(number),
                name: String(name),
                location: String(location),
              })
            }
          }}
        >
          Add Team
        </Button>
      </Row>
      <hr />
    </div>
  );
}
