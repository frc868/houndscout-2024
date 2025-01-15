import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import DeleteButton from "./DeleteButton";
import { Scouter } from "@/redux/adminDataSlice";
import { createScouterAsync, deleteScouterAsync } from "@/redux/mainDataSlice";
import NewScouterForm from "./NewScouterForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface Props {
  show: boolean;
  scouters: Scouter[];
  handleClose: () => void;
}

//So far, this modal just lists scouters, allows you to delete them, and allows you to create the,.
export default function ScouterManageModal({
  show,
  scouters,
  handleClose
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showScouterNew, setShowScouterNew] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Scouters</Modal.Title>
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
        className="edit-button mx-3 mb-3"
        onClick={() => setShowScouterNew(!showScouterNew)}
        >
          {showScouterNew?"Hide":"Show"} New Scouter Form
        </Button>
        {showScouterNew&&(
          <NewScouterForm
            handleSubmit={
              async (payload) => {
                setLoading(true);
                await dispatch(
                  createScouterAsync({
                    ...payload,
                  })
                );
                setLoading(false);
                setShowScouterNew(false);
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
                handleDelete={async () => {
                  setLoading(true);
                  await dispatch(
                    deleteScouterAsync({ id: scouter.id })
                  );
                  setLoading(false);
                }}
              />  
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <p>Note: WIP</p>
      </Modal.Footer>
    </Modal>
  );
}
