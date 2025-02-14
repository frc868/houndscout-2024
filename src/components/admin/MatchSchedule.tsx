/* eslint-disable react/display-name */
import { createMatchAsync, deleteMatchAsync, editMatchAsync } from "@/redux/adminDataSlice";
import { setActiveMatchAsync } from "@/redux/mainDataSlice";
import React, { useState } from "react";
import { Button, Table, Form, Row } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";
import DeleteButton from "./DeleteButton";
import MatchAddModal from "./MatchAddModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event } from "@prisma/client"
import { MoonLoader } from "react-spinners";
import { Match, Team, Scouter } from "@/lib/enums"
interface Props {
  matches: Match[];
  teams: Team[];
  activeMatchName: string;
  scouters: Scouter[];
  handleScouterSelect: (matchName: string, station: string, id: number) => void;
}

export default function MatchSchedule({
  matches,
  teams,
  activeMatchName,
  scouters,
  handleScouterSelect,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const adminData = useSelector((state: ReduxState) => state.adminData);
  const [showMatchCreate, setShowMatchCreate] = useState(false);
  const [showMatchEdit, setShowMatchEdit] = useState(false);
  const [matchEditData, setMatchEditData] = useState<{
    match: number;
    name: string;
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number;
  }>({
    match: 0,
    name: "",
    red1: 0,
    red2: 0,
    red3: 0,
    blue1: 0,
    blue2: 0,
    blue3: 0
  });

  const [loading, setLoading] = useState(false);
  return (
    <div className="d-flex justify-content-center">
      <MatchAddModal
      // Create a new match
        teams={teams as Team[]}
        show={showMatchCreate}
        showMatchNumber={true}
        submitVar="success"
        handleClose={() => setShowMatchCreate(false)}
        handleSubmit={async (payload) => {
          await dispatch(
            createMatchAsync({
              eventCode: mainData.activeEvent?.code as string,
              ...payload,
            })
          );
          setShowMatchCreate(false);
        }}
      ></MatchAddModal>
      <MatchAddModal
      // Edit an existing match
        teams={teams as Team[]}
        showMatchNumber={false}
        initialMatch={matchEditData.match}
        initialRed1={matchEditData.red1}
        initialRed2={matchEditData.red2}
        initialRed3={matchEditData.red3}
        initialBlue1={matchEditData.blue1}
        initialBlue2={matchEditData.blue2}
        initialBlue3={matchEditData.blue3}
        submitVar="primary"
        show={showMatchEdit}
        handleClose={() => setShowMatchEdit(false)}
        handleSubmit={async (payload) => {
          await dispatch(
            editMatchAsync({
              eventCode: mainData.activeEvent?.code as string,
              name: matchEditData.name,
              ...payload,
            })
          );
          setShowMatchEdit(false);
        }}
      ></MatchAddModal>
      <div className="d-flex flex-column">
        <Row className="mb-3">
          <h1 className="text-center">Match Schedule</h1>
          <MoonLoader
            color={"black"}
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Row>
        <Row className="mb-3">
          <Button
            className="w-25 mx-auto"
            onClick={() => {setShowMatchCreate(true);}}
          >
            Create New Match
          </Button>
          <Button 
            variant="secondary"
            className="mx-auto"
            onClick={() => {
              if(adminData.scouters==undefined||adminData.scouters.length<6){
                alert("Error: At least 6 scouters must be created to generate a scouter schedule.");
              } else matches.map((match) => {
                setLoading(true);
                let scoutersLeft=JSON.parse(JSON.stringify(adminData.scouters as Scouter[]));
                let r1 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                let r2 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                let r3 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                let b1 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                let b2 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                let b3 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
                handleScouterSelect(match.name, "red1", r1[0].id);
                handleScouterSelect(match.name, "red2", r2[0].id);
                handleScouterSelect(match.name, "red3", r3[0].id);
                handleScouterSelect(match.name, "blue1", b1[0].id);
                handleScouterSelect(match.name, "blue2", b2[0].id);
                handleScouterSelect(match.name, "blue3", b3[0].id);
                setLoading(false);
              })
            }}
          >
            Generate Scouter Schedule
          </Button>
        </Row>
        <Table bordered className="border-secondary-subtle">
          <thead className="align-middle text-center">
            <tr>
              <th></th>
              <th>Red 1</th>
              <th>Red 2</th>
              <th>Red 3</th>
              <th>Blue 1</th>
              <th>Blue 2</th>
              <th>Blue 3</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="align-middle text-center">
            {matches.map((match) => (
              //For each match, the team in each position is listed.
              <tr
                key={match.id}
                className={`${match.name === activeMatchName && "fw-bold"}`}
              >
                <td
                  className={`px-2 ${
                    match.name === activeMatchName && "table-secondary"
                  }`}
                >
                  Match {match.number}
                  <Form.Check
                    type="radio"
                    label="Active"
                    name="active"
                    checked={match.name === activeMatchName}
                    onChange={async () => {
                      //Sets the match as the active one if it isn't already.
                      setLoading(true);
                      await dispatch(
                        setActiveMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          matchName: match.name,
                        })
                      )
                      setLoading(false);
                    }}
                  />
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red1}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red1?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "red1", id)
                    }
                  />
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red2}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red2?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "red2", id)
                    }
                  />
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red3}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red3?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "red3", id)
                    }
                  />
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue1}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue1?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "blue1", id)
                    }
                  />
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue2}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue2?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "blue2", id)
                    }
                  />
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue3}{" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue3?.name || "Not Assigned"}
                    scouters={scouters}
                    handleScouterSelect={(id) =>
                      handleScouterSelect(match.name, "blue3", id)
                    }
                  />
                </td>
                <td
                  className={`px-2 py-4 d-flex flex-column ${
                    match.name === activeMatchName && "table-secondary"
                  }`}
                >
                  <Button
                  variant={
                    match.name === activeMatchName
                      ? "primary"
                      : "outline-primary"
                  }
                  className={"mb-1 mx-2"}
                  size="sm"
                  onClick={async () => {
                    setMatchEditData({
                      match: match.number,
                      name: match.name,
                      red1: match.teamNumbers.red1,
                      red2: match.teamNumbers.red2,
                      red3: match.teamNumbers.red3,
                      blue1: match.teamNumbers.blue1,
                      blue2: match.teamNumbers.blue2,
                      blue3: match.teamNumbers.blue3
                    });
                    setShowMatchEdit(true);
                  }}
                  >
                    Edit Event
                  </Button>
                  <DeleteButton
                    variant={
                      match.name === activeMatchName
                        ? "danger"
                        : "outline-danger"
                    }
                    handleDelete={async () => {
                      //deletes the match.
                      setLoading(true);
                      await dispatch(
                        deleteMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          matchName: match.name,
                        })
                      )
                      setLoading(false);
                    }}
                  />
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}
