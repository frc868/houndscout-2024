import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
import DeleteButton from "./DeleteButton";

interface Props {
  show: boolean;
  eventList: Event[];
  handleClose: () => void;
  handleDelete: (code: string) => void;
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

export default function ScouterManageModal({
  show,
  eventList,
  handleClose,
  handleDelete,
  handleSubmit,
}: Props) {

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {eventList.map((event: Event)=>(
            <ListGroup.Item>
              Week {event.weekNumber}: {event.name} ({event.code})
              <DeleteButton
                variant={"danger"}
                handleDelete={() => handleDelete(event.code)}
              />  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <p>Note: Non-functional, use patch in api/v1/events/[code]</p>
        <Button variant="secondary" className="bg-danger" onClick={handleClose}>
          Discard Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
