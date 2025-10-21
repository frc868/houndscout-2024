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
  activeEvent: string;
}

//Blue Alliance data import.
export default function TBADataModal({
  show,
  handleClose,
  handleSubmit,
  handleOnline,
  activeEvent,
}: Props) {
  const [teams, setTeams] = useState("");
  const [matches, setMatches] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_TBA_API_KEY;

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Data from The Blue Alliance API</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <small>Current Event Code: {activeEvent}</small><br />
        <small>API Key: {apiKey}</small><br />
        <p>Please go <a href="https://www.thebluealliance.com/apidocs/v3">here</a> to authorize the API Key above. If importing data offline, search for and run the API routes below to get the necessary data.</p>
        <p>Note that match schedules are typically only available shortly before the competition starts.</p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label><strong>Teams ({"/event/{event_key}/teams"})</strong></Form.Label>
            <Form.Control
              value={teams}
              as="textarea"
              onChange={(e) => setTeams(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Matches ({"/event/{event_key}/matches/simple"})</strong></Form.Label>
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
          onClick={handleOnline}
        >
          Upload Directly from Online
        </Button>
        <Button
          variant="success"
          onClick={() => {
            if (teams==""||matches=="") {
              alert("Form is incomplete. Cannot submit.");
            } else {
              handleSubmit({ teams, matches })
            }
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
