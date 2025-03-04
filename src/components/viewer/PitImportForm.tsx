import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  handleSubmit: ({
    stats,
  }: {
    stats: string;
  }) => void;
}

export default function PitImportModal({
  handleSubmit,
}: Props) {
  const [data, setData] = useState("");

  return (
    <div>
      <Row>
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Please use the Export Pit Data button on the pit scouting device to display data. Copy the data section here.</Form.Label>
            <Form.Control
              value={data}
              as="textarea"
              onChange={(e) => setData(e.target.value)}
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
              stats: data
            })
          }
        >
          Submit
        </Button>
      </Row>
      <hr />
    </div>
  );
}
