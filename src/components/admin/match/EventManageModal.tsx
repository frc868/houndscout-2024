import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import NewEventForm from "./NewEventForm";
import { deleteEventAsync, createEventAsync, setActiveEventAsync } from "@/redux/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
interface Props {
  show: boolean;
  eventList: Event[];
  handleClose: () => void;
  activeEvent: string;
}

export default function EventManageModal({
  show,
  eventList,
  handleClose,
  activeEvent
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showEventNew, setShowEventNew] = useState(false);
  const [loading, setLoading] = useState(false); //I put a small loading animation jsut for user feedback.

  //Everything managing events.
  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title>Manage Events</Modal.Title>
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
        <Button
        //This first part opens an extra form to create a new event.
        className="edit-button mx-3 mb-3"
        onClick={() => setShowEventNew(!showEventNew)}
        >
          {showEventNew?"Hide":"Show"} New Event Form
        </Button>
        {showEventNew&&(
          <NewEventForm
            handleSubmit={
              async (payload) => {
                setLoading(true);
                await dispatch( 
                  createEventAsync({
                    ...payload,
                  })
                );
                setLoading(false);
                setShowEventNew(false);
              }
            }
          ></NewEventForm>
        )}
        <ListGroup>
          {eventList.map((event: Event)=>(
            //Each of these event is represented by some basic info and buttons to set as active and delete them.
            <ListGroup.Item className={`${event.code === activeEvent && "fw-bold table-secondary"}`}>
              Week {event.weekNumber}: {event.name} ({event.code})
              <Button
                className="mx-2"
                size="sm"
                variant={
                  event.code === activeEvent
                    ? "primary"
                    : "outline-primary"
                }
                onClick={async () => {
                  setLoading(true);
                  await dispatch(setActiveEventAsync({ eventCode: event.code }))
                  setLoading(false);
                }}
              >
                {event.code === activeEvent?"Current Active Event":"Set As Active Event"}
              </Button>
              <DeleteButton
                variant={
                  event.code === activeEvent
                    ? "danger"
                    : "outline-danger"
                }
                handleDelete={async () => {
                  setLoading(true);
                  await dispatch(deleteEventAsync({ eventCode: event.code }))
                  setLoading(false);
                }}
              />  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
