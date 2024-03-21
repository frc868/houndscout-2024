/* eslint-disable react/display-name */
import { Event } from "@prisma/client";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

interface Props {
  event: Event;
}

export default function EventDetails({ event }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Event</h1>
      <Card className="mb-4">
        <Row className="g-0">
          <Col>
            <Card.Body>
              <Card.Title as="h4" className="mb-2">
                {event.name}
              </Card.Title>
              <Card.Subtitle>
                <div className="mt-3 mb-3 font-monospace">{event.code}</div>
              </Card.Subtitle>
              <div className="my-1">Week {event.weekNumber}</div>
              <div className="my-1">
                {event.startDate?.toDateString()} to{" "}
                {event.endDate?.toDateString()}
              </div>
              <div className="my-1">{event.address}</div>
            </Card.Body>
          </Col>
          <Card.Footer>
            <Button className="edit-button">Configure</Button>
          </Card.Footer>
        </Row>
      </Card>
      {/* <Button>Configure Event</Button> */}
    </div>
  );
}
