import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
interface Props {
  show: boolean;
  event: Event;
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

//This is initially filled in using data from the current event.
//Currently WIP; see notice in footer.
export default function EventEditModal({
  show,
  event,
  handleClose,
  handleSubmit,
}: Props) {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [week, setWeek] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false); //I put a small loading animation jsut for user feedback.

  useEffect(() => {
    if (show) {
      setName(event.name as string);
      setCode(event.code as string);
      setWeek(event.weekNumber?.toString() as string);
      setStart(event.startDate?.toISOString().substring(0, 10) as string);
      setEnd(event.endDate?.toISOString().substring(0, 10) as string);
      setAddress(event.address as string);
    }
  }, [show]);

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
        <MoonLoader
          className="mx-2"
          color={"black"}
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
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
                {/* Format: yyyy-mm-dd */}
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
        <Button
          variant="primary"
          onClick={() => {
            setLoading(true);
            handleSubmit({
              name: String(name),
              code: String(code),
              week: Number(week),
              start: String(start+"T00:00:00.000Z"),
              end: String(end+"T00:00:00.000Z"),
              address: String(address)
            })
            setLoading(false);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
