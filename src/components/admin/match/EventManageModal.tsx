import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import NewEventForm from "./NewEventForm";
import { createEventAsync } from "@/redux/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
interface Props {
  show: boolean;
  eventList: Event[];
  handleClose: () => void;
  handleDelete: (code: string) => void;
  handleSelect: (code: string) => void;
  activeEvent: string;
}

export default function EventManageModal({
  show,
  eventList,
  handleClose,
  handleDelete,
  handleSelect,
  activeEvent
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [showEventNew, setShowEventNew] = useState(false);

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title>Manage Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
        className="edit-button mx-3 mb-3"
        onClick={() => setShowEventNew(!showEventNew)}
        >
          {showEventNew?"Hide":"Show"} New Event Form
        </Button>
        {showEventNew&&(
          <NewEventForm
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
          ></NewEventForm>
        )}
        <ListGroup>
          {eventList.map((event: Event)=>(
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
                onClick={()=>handleSelect(event.code)}
              >
                {event.code === activeEvent?"Current Active Event":"Set As Active Event"}
              </Button>
              <DeleteButton
                variant={
                  event.code === activeEvent
                    ? "danger"
                    : "outline-danger"
                }
                handleDelete={() => handleDelete(event.code)}
              />  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
