import { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import { Event } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import { Team } from "@/redux/adminDataSlice";
import NewTeamForm from "./NewTeamForm";

interface Props {
  show: boolean;
  teams: Team[];
  handleClose: () => void;
  handleDelete: (number: number) => void;
  handleSelect: (number: number) => void;
}

export default function TeamManageModal({
  show,
  teams,
  handleClose,
  handleDelete,
  handleSelect
}: Props) {
  const [showTeamNew, setShowTeamNew] = useState(false);
  return (
    <Modal centered show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Teams</Modal.Title>
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
            handleSubmit={()=>{
              // async (payload) => {
              //   await dispatch(
              //     createTeamAsync({
              //       ...payload,
              //     })
              //   );
              //   setShowEventNew(false);
              }
            }
          ></NewTeamForm>
        )}
        <ListGroup>
          {teams.map((team: Team)=>(
            <ListGroup.Item>
              Team {team.number}: {team.name}
              <Button
                className="mx-2"
                size="sm"
                variant={
                  true
                    ? "primary"
                    : "outline-primary"
                }
                onClick={()=>handleSelect(team.number)}
              >
                Select
              </Button>
              <DeleteButton
                variant={
                  true
                    ? "danger"
                    : "outline-danger"
                }
                handleDelete={() => handleDelete(team.number)}
              /> 
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <p>Note: Non-functional</p>
        <Button
        className="edit-button mx-3"
        onClick={() => setShowTeamNew(true)}
        >
          New Team
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
