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
}

//Blue Alliance data import.
export default function TBADataModal({
  show,
  handleClose,
  handleSubmit,
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
            <Form.Label>Teams</Form.Label>
            <Form.Control
              placeholder={`e.g. [{"city": "Carmel", "team_number": 868, "nickname": "TechHOUNDS"}, ...]`}
              value={teams}
              as="textarea"
              onChange={(e) => setTeams(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Matches</Form.Label>
            <Form.Control
              placeholder={`e.g. [{"alliances": {"blue": {"team_keys": ["frc868", "frc1741", "frc1024"]}}}, ...]`}
              value={matches}
              as="textarea"
              onChange={(e) => setMatches(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
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
