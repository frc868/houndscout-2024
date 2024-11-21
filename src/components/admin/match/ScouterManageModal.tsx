import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import { Scouter } from "@/redux/adminDataSlice";
import NewScouterForm from "./NewScouterForm";

interface Props {
  show: boolean;
  scouters: Scouter[];
  handleClose: () => void;
  handleDelete: (id: number) => void;
}

export default function ScouterManageModal({
  show,
  scouters,
  handleClose,
  handleDelete,
}: Props) {
  const [showScouterNew, setShowScouterNew] = useState(false);

  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Scouters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
        className="edit-button mx-3 mb-3"
        onClick={() => setShowScouterNew(!showScouterNew)}
        >
          {showScouterNew?"Hide":"Show"} New Scouter Form
        </Button>
        {showScouterNew&&(
          <NewScouterForm
            handleSubmit={()=>{
              // async (payload) => {
              //   await dispatch(
              //     createScouterAsync({
              //       ...payload,
              //     })
              //   );
              //   setShowEventNew(false);
              }
            }
          ></NewScouterForm>
        )}
        <ListGroup>
          {scouters.map((scouter: Scouter)=>(
            <ListGroup.Item>
              {scouter.name}
              <DeleteButton
                variant={"danger"}
                handleDelete={() => handleDelete(scouter.id)}
              />  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <p>Note: Non-functional</p>
        
      </Modal.Footer>
    </Modal>
  );
}
