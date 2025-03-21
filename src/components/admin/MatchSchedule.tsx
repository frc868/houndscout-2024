/* eslint-disable react/display-name */
import { createMatchAsync, deleteMatchAsync, editMatchAsync } from "@/redux/adminDataSlice";
import { setActiveMatchAsync } from "@/redux/mainDataSlice";
import React, { useState } from "react";
import { Button, Table, Form, Row } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";
import TeamDropdown from "../TeamDropdown";
import DeleteButton from "./DeleteButton";
import MatchAddModal from "./NewMatchModal";
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

  const generateScouterSchedule=(m:number)=>{
    let match=matches[m];
    for(var i = m + 1; i < matches.length; i++) {
      if(!matches[i].submitted.red1&&match.scouters.red1) handleScouterSelect(matches[i].name, "red1", match.scouters.red1.id);
      if(!matches[i].submitted.red2&&match.scouters.red1) handleScouterSelect(matches[i].name, "red2", match.scouters.red2.id);
      if(!matches[i].submitted.red3&&match.scouters.red1) handleScouterSelect(matches[i].name, "red3", match.scouters.red3.id);
      if(!matches[i].submitted.blue1&&match.scouters.red1) handleScouterSelect(matches[i].name, "blue1", match.scouters.blue1.id);
      if(!matches[i].submitted.blue2&&match.scouters.red1) handleScouterSelect(matches[i].name, "blue2", match.scouters.blue2.id);
      if(!matches[i].submitted.blue3&&match.scouters.red1) handleScouterSelect(matches[i].name, "blue3", match.scouters.blue3.id);
    }
    // if(adminData.scouters==undefined||adminData.scouters.filter(scouter=>scouter.active).length<6){
    //   alert("At least 6 scouters must be active to generate a scouter schedule.");
    // } else {
    //   let scoutersLeft=JSON.parse(JSON.stringify(adminData.scouters.filter(scouter=>scouter.active) as Scouter[]));
    //   let r1 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   let r2 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   let r3 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   let b1 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   let b2 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   let b3 = scoutersLeft.splice(Math.floor(Math.random() * scoutersLeft.length),1);
    //   handleScouterSelect(match.name, "red1", r1[0].id);
    //   handleScouterSelect(match.name, "red2", r2[0].id);
    //   handleScouterSelect(match.name, "red3", r3[0].id);
    //   handleScouterSelect(match.name, "blue1", b1[0].id);
    //   handleScouterSelect(match.name, "blue2", b2[0].id);
    //   handleScouterSelect(match.name, "blue3", b3[0].id);
    // }
  }

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
      />
      <div className="d-flex flex-column">
        <Row className="mb-3">
          <h1 className="text-center">Match Schedule</h1>
          <MoonLoader
            color={"black"}
            loading={!(adminData.scoutersStatus&&adminData.eventTeamsStatus&&adminData.matchesStatus)}
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
          <Row className="mb-3">
          {/* <Button
            variant="secondary"
            className="w-25 mx-auto"
            onClick={()=>{matches.forEach(generateScouterSchedule);}}
          >
            Gen. Scouter Sched. (all unfilled);
          </Button> */}
        </Row>
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
                      await dispatch(
                        setActiveMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          matchName: match.name,
                        })
                      )
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.red1?"table-success":"table-danger"}`}>
                  <TeamDropdown
                    red={true}
                    activeTeam={Number(match.teamNumbers.red1)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.red1){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: number,
                          red2: match.teamNumbers.red2,
                          red3: match.teamNumbers.red3,
                          blue1: match.teamNumbers.blue1,
                          blue2: match.teamNumbers.blue2,
                          blue3: match.teamNumbers.blue3,
                        })
                      )
                    }}
                  />
                  {" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red1||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.red1){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "red1", id)
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.red2?"table-success":"table-danger"}`}>
                  <TeamDropdown
                    red={true}
                    activeTeam={Number(match.teamNumbers.red2)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.red2){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: match.teamNumbers.red1,
                          red2: number,
                          red3: match.teamNumbers.red3,
                          blue1: match.teamNumbers.blue1,
                          blue2: match.teamNumbers.blue2,
                          blue3: match.teamNumbers.blue3,
                        })
                      )
                    }}
                  />
                  {" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red2||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.red2){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "red2", id)
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.red3?"table-success":"table-danger"}`}>
                  <TeamDropdown
                    red={true}
                    activeTeam={Number(match.teamNumbers.red3)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.red3){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: match.teamNumbers.red1,
                          red2: match.teamNumbers.red2,
                          red3: number,
                          blue1: match.teamNumbers.blue1,
                          blue2: match.teamNumbers.blue2,
                          blue3: match.teamNumbers.blue3,
                        })
                      )
                    }}
                  />
                  {" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.red3||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.red3){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "red3", id)
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.blue1?"table-success":"table-primary"}`}>
                  <TeamDropdown
                    red={false}
                    activeTeam={Number(match.teamNumbers.blue1)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.blue1){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: match.teamNumbers.red1,
                          red2: match.teamNumbers.red2,
                          red3: match.teamNumbers.red3,
                          blue1: number,
                          blue2: match.teamNumbers.blue2,
                          blue3: match.teamNumbers.blue3,
                        })
                      )
                    }}
                  />
                  {" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue1||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.blue1){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "blue1", id)
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.blue2?"table-success":"table-primary"}`}>
                  <TeamDropdown
                    red={false}
                    activeTeam={Number(match.teamNumbers.blue2)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.blue2){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: match.teamNumbers.red1,
                          red2: match.teamNumbers.red2,
                          red3: match.teamNumbers.red3,
                          blue1: match.teamNumbers.blue1,
                          blue2: number,
                          blue3: match.teamNumbers.blue3,
                        })
                      )
                    }}
                  />
                  {" "}
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue2||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.blue2){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "blue2", id)
                    }}
                  />
                </td>
                <td className={`px-2 ${match.submitted.blue1?"table-success":"table-primary"}`}>
                  <TeamDropdown
                    red={false}
                    activeTeam={Number(match.teamNumbers.blue3)}
                    teams={adminData.eventTeams as Team[]}
                    handleTeamSelect={async (number) => {
                      if(match.submitted.blue3){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else await dispatch(
                        editMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          number: match.number,
                          name: match.name,
                          red1: match.teamNumbers.red1,
                          red2: match.teamNumbers.red2,
                          red3: match.teamNumbers.red3,
                          blue1: match.teamNumbers.blue1,
                          blue2: match.teamNumbers.blue2,
                          blue3: number,
                        })
                      )
                    }}
                  />
                  <ScoutersDropdown
                    active={match.name === activeMatchName}
                    activeScouter={match.scouters.blue3||undefined}
                    scouters={scouters}
                    handleScouterSelect={(id) => {
                      if(match.submitted.blue3){
                        alert("This score has already been submitted; You can no longer change its team or scouter.");
                      } else handleScouterSelect(match.name, "blue3", id)
                    }}
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
                    onClick={()=>generateScouterSchedule(matches.indexOf(match))}
                    
                  >
                    Copy Scouters (WIP)
                  </Button>
                  <DeleteButton
                    variant={
                      match.name === activeMatchName
                        ? "danger"
                        : "outline-danger"
                    }
                    handleDelete={async () => {
                      //deletes the match.
                      await dispatch(
                        deleteMatchAsync({
                          eventCode: mainData.activeEvent?.code as string,
                          matchName: match.name,
                        })
                      )
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
