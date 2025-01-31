import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import DeleteButton from "./DeleteButton";
import { Team } from "@/lib/enums"
import { createTeamAsync, deleteTeamAsync } from "@/redux/adminDataSlice";
import NewTeamForm from "./NewTeamForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface Props {
  show: boolean;
  teams: Team[];
  handleClose: () => void;
}

//Lists teams and allows you to delete and create them. Add team to event function WIP.
export default function TeamManageModal({
  show,
  teams,
  handleClose
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showTeamNew, setShowTeamNew] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Teams</Modal.Title>
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
          variant={showTeamNew?"danger":"primary"}
          className="edit-button mx-3 mb-3"
          onClick={() => setShowTeamNew(!showTeamNew)}
        >
          {showTeamNew?"Cancel":"Add New Team"}
        </Button>
        {showTeamNew&&(
          <NewTeamForm
            handleSubmit={
              async (payload) => {
                setLoading(true);
                await dispatch(
                  createTeamAsync({
                    ...payload,
                  })
                );
                setLoading(false);
                setShowTeamNew(false);
              }
            }
          ></NewTeamForm>
        )}
        <ListGroup>
          {teams.map((team: Team)=>(
            <ListGroup.Item>
              Team {team.number}: {team.name}
              <Button disabled
                className="mx-2"
                size="sm"
                variant={
                  true
                    ? "primary"
                    : "outline-primary"
                }
                onClick={
                  async () => {
                    setLoading(true);
                    // await dispatch(
                    //   deleteTeamAsync({ teamNumber: team.number })
                    // );
                    setLoading(false);
                  }
                }
              >
                Add to Event
              </Button>
              <DeleteButton
                variant={
                  true
                    ? "danger"
                    : "outline-danger"
                }
                handleDelete={
                  async () => {
                    setLoading(true);
                    await dispatch(
                      deleteTeamAsync({ teamNumber: team.number })
                    );
                    setLoading(false);
                  }
                }
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
