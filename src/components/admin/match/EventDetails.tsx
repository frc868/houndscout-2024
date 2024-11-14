/* eslint-disable react/display-name */
import { Event } from "@prisma/client";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import EventEditModal from "./EventEditModal";
import NewEventModal from "./EventNewModal";
import EventManageModal from "./EventManageModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Match, Scouter, createEventAsync, editEventAsync, deleteEventAsync } from "@/redux/adminDataSlice";
interface Props {
  event: Event;
  eventList: Event[];
}

export default function EventDetails({ event, eventList }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const [showEventEdit, setShowEventEdit] = useState(false);
  const [showEventNew, setShowEventNew] = useState(false);
  const [showEventManage, setShowEventManage] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center">
      <EventEditModal
        show={showEventEdit}
        intName={event.name as string}
        intCode={event.code as string}
        intWeek={event.weekNumber?.toString() as string}
        intStart={event.startDate?.toISOString() as string}
        intEnd={event.endDate?.toISOString() as string}
        intAddress={event.address as string}
        handleClose={() => setShowEventEdit(false)}
        handleSubmit={() => setShowEventEdit(false)
          // async (code, payload) => {
          // await dispatch(
          //   editEventAsync({
          //     eventCode: code,
          //     ...payload,
          //   })
          // );
          // setShowEventEdit(false);
        // }
        }
      ></EventEditModal>
      <NewEventModal
        show={showEventNew}
        handleClose={() => setShowEventNew(false)}
        handleSubmit={
          async (payload) => {
          await dispatch(
            createEventAsync({
              ...payload,
            })
          );
          setShowEventNew(false);
        }
        }
      ></NewEventModal>
      <EventManageModal
        show={showEventManage}
        eventList={eventList as Event[]}
        handleClose={() => setShowEventManage(false)}
        handleDelete={async (code) =>
          await dispatch(
            deleteEventAsync({ eventCode: code })
          )
        }
        handleSubmit={() => setShowEventManage(false)
          // async (payload) => {
          // await dispatch(
          //   createMatchAsync({
          //     eventCode: mainData.activeEvent?.code as string,
          //     ...payload,
          //   })
          // );
          // setShowEventEdit(false);
        // }
        }
      ></EventManageModal>
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
              Edit Event
            </Button>
            <Button
            className="edit-button mx-3"
            onClick={() => setShowEventNew(true)}
            >
              New Event
            </Button>
            <Button
            className="edit-button mx-1"
            onClick={() => setShowEventManage(true)}
            >
              Manage Events
            </Button>
          </Card.Footer>
        </Row>
      </Card>
    </div>
  );
}
