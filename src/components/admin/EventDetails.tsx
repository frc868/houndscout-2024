/* eslint-disable react/display-name */
import { Event } from "@prisma/client";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import EventEditModal from "./EventEditModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { editEventAsync } from "@/redux/adminDataSlice";
interface Props {
  event: Event;
}

//Displays details of the current event. Not too much to it.
export default function EventDetails({ event }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showEventEdit, setShowEventEdit] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center">
      <EventEditModal
        show={showEventEdit}
        event={event as Event}
        handleClose={() => setShowEventEdit(false)}
        handleSubmit={async (payload) => {
          await dispatch(
            editEventAsync({
              name: payload.name,
              newCode: payload.code,
              week: payload.week,
              start: payload.start,
              end: payload.end,
              address: payload.address,
              eventCode: event.code,
            })
          );
          setShowEventEdit(false);
        }
        }
      />
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
            <Button
            className="edit-button mx-1"
            onClick={() => setShowEventEdit(true)}
            >
              Edit Event (WIP)
            </Button>
          </Card.Footer>
        </Row>
      </Card>
    </div>
  );
}
