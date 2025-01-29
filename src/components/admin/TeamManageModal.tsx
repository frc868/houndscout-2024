import { useState, useEffect } from "react";
import { Button, Modal, ListGroup, Form } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import DeleteButton from "./DeleteButton";
import { createTeamAsync, deleteTeamAsync, addTeamToEventAsync } from "@/redux/adminDataSlice";
import { Team } from "@/lib/enums";
import NewTeamForm from "./NewTeamForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

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
  const mainData = useSelector((state: ReduxState) => state.mainData);
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
        className="edit-button mx-3 mb-3"
        onClick={() => setShowTeamNew(!showTeamNew)}
        >
          {showTeamNew?"Hide":"Show"} New Team Form
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
            <ListGroup.Item key={team.id}>
              Team {team.number}: {team.name}
              <Button
                className="mx-2"
                size="sm"
                variant={
                  true
                    ? "primary"
                    : "outline-primary"
                }
                onClick={
                  async () => {
                    //Adds team to current event
                    setLoading(true);
                    await dispatch(
                      addTeamToEventAsync({
                        eventCode: mainData.activeEvent?.code as string,
                        teamNumber: team.number,
                      })
                    )
                    setLoading(false);
                  }
                }
              >
                Add to Event (TBA)
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
