import { useState, useEffect } from "react";
import { Button, Modal, ListGroup, Form } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import DeleteButton from "./DeleteButton";
import { createTeamAsync, deleteTeamAsync, addTeamToEventAsync, removeTeamFromEventAsync } from "@/redux/adminDataSlice";
import { Team } from "@/lib/enums";
import NewTeamForm from "./NewTeamForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

interface Props {
  show: boolean;
  allTeams: Team[];
  eventTeams: Team[];
  handleClose: () => void;
}

//Lists teams and allows you to delete and create them. Add team to event function WIP.
export default function TeamManageModal({
  show,
  allTeams,
  eventTeams,
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
          variant={showTeamNew?"danger":"primary"}
          className="edit-button w-100 mx-auto mb-3"
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
          {allTeams.map((team: Team)=>(
            <ListGroup.Item key={team.id} className={`${eventTeams.some(item=>item.id==team.id) && "fw-bold bg-secondary-subtle"}`}>
              Team {team.number}: {team.name} from {team.location}
              <Form.Check
                type="checkbox"
                label="In Current Event"
                checked={eventTeams.some(item=>item.id==team.id)}
                onChange={async () => {
                  //Sets the match as the active one if it isn't already.
                  setLoading(true);
                  if(eventTeams.some(item=>item.id==team.id)){
                    await dispatch(
                      removeTeamFromEventAsync({
                        eventCode: mainData.activeEvent?.code as string,
                        teamNumber: team.number,
                      })
                    )
                  } else {
                    await dispatch(
                      addTeamToEventAsync({
                        eventCode: mainData.activeEvent?.code as string,
                        teamNumber: team.number,
                      })
                    )
                  }
                  setLoading(false);
                }}
              />
              <DeleteButton
                variant={
                  eventTeams.some(item=>item.id==team.id)
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
    </Modal>
  );
}
