import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSubmit: ({
    teams,
    matches,
  }: {
    teams: string;
    matches: string;
  }) => void;
  handleOnline: () => void;
}

//Blue Alliance data import.
export default function TBADataModal({
  show,
  handleClose,
  handleSubmit,
  handleOnline
}: Props) {
  const [teams, setTeams] = useState("");
  const [matches, setMatches] = useState("");

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Data from The Blue Alliance API</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Teams ({"/event/{event_key}/teams"})</Form.Label>
            <Form.Control
              value={teams}
              as="textarea"
              onChange={(e) => setTeams(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Matches ({"/event/{event_key}/matches/simple"})</Form.Label>
            <Form.Control
              value={matches}
              as="textarea"
              onChange={(e) => setMatches(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <p>Warning: This will OVERWRITE all matches in the current event.</p>
        <Button
          variant="success"
          disabled
          onClick={() => handleSubmit({ teams, matches })}
        >
          Upload Online (WIP)
        </Button>
        <Button
          variant="success"
          onClick={() => handleSubmit({ teams, matches })}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
