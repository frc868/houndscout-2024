import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  handleSubmit: ({name} : {name: string;}) => void;
}

//The part of the ScouterManageModal that allows you to create a new scouter. Basically a form.
export default function NewScouterModal({
  handleSubmit,
}: Props) {
  const [name, setName] = useState("");

  return (
    <div>
      <Row>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Scouter Name:</Form.Label>
            <Form.Control
              placeholder="e.g. David"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Button
          variant="success"
          className="mt-2"
          onClick={() => {
            if (name=="") {
              alert("Form is incomplete. Cannot submit.");
            } else {
              handleSubmit({
                name: String(name)
              })
            }
          }}
        >
          Add Scouter
        </Button>
      </Row>
      <hr />
    </div>
  );
}
