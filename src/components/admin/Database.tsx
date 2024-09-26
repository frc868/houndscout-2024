/* eslint-disable react/display-name */
import { Match, Scouter, Team, createMatchAsync } from "@/redux/adminDataSlice";
import { Scores } from "@/redux/scoresSlice";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";
import DeleteButton from "../client/common/DeleteButton";
import MatchAddModal from "./MatchAddModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event } from "@prisma/client";

interface Props {
  teams: Team[];
  activeMatchName: string;
  handleMatchSelect: (name: string) => void;
  handleMatchDelete: (name: string) => void;
  scouters: Scouter[];
  handleScouterSelect: (matchName: string, station: string, id: number) => void;
}

enum ClimbType {
  NONE,
  PARKED,
  CLIMBED
}

enum StartZone {
  ONE,
  TWO,
  THREE
}

export default function Database({
  teams,
  activeMatchName,
  handleMatchSelect,
  handleMatchDelete,
  scouters,
  handleScouterSelect,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  //map arrays for teams, then map arrays for everything from teamScores
  const dataArray:any[]=[]
  async () => await teams.map((team:Team)=>{
    dataArray.push({
      number: team.number,
      name: team.name,
      total: team.teamScores.length,
      startZone1: team.teamScores.map(score=>score.startZone).filter(item=>item===StartZone.ONE).length,
      startZone2: team.teamScores.map(score=>score.startZone).filter(item=>item===StartZone.TWO).length,
      startZone3: team.teamScores.map(score=>score.startZone).filter(item=>item===StartZone.THREE).length,
      leftStart: team.teamScores.map(score=>score.leftStart).filter(item=>item===true).length,
      climbNone: team.teamScores.map(score=>score.climb).filter(item=>item===ClimbType.NONE).length,
      climbPark: team.teamScores.map(score=>score.climb).filter(item=>item===ClimbType.PARKED).length,
      climbClimb: team.teamScores.map(score=>score.climb).filter(item=>item===ClimbType.CLIMBED).length,
      numOnChain0: team.teamScores.map(score=>score.numOnChain).filter(item=>item===0).length,
      numOnChain1: team.teamScores.map(score=>score.numOnChain).filter(item=>item===1).length,
      numOnChain2: team.teamScores.map(score=>score.numOnChain).filter(item=>item===2).length,
      numOnChain3: team.teamScores.map(score=>score.numOnChain).filter(item=>item===3).length,
      trap: team.teamScores.map(score=>score.trap).filter(item=>item===true).length,
      spotlit: team.teamScores.map(score=>score.spotlit).filter(item=>item===true).length
    });
  })
// Probably just easier to go by team.
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column">
        <h1 className="text-center mb-3">Database (WIP)</h1>
        <Table bordered className="border-secondary-subtle">
          <thead className="align-middle text-center">
            <tr>
              <th>Team</th>
              <th>Starting Zone</th>
              {/* <th>Auton Game Pieces Used</th> */}
              <th>Left Start in Auton?</th>
              <th>Climb Types:</th>
              <th># Robots on Chain</th>
              <th>Scored in Trap?</th>
              <th>Spotlit?</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="align-middle text-center">
            {/* Map score information based on teams */}
            {dataArray.map((team) => (
              <tr key={team.number}>
                <td className=" table-secondary">
                  Team {team.number}: {team.name}
                </td>
                <td className="px-2">
                  {team.startZone1} (Zone 1)/{team.startZone2} (Zone 2)/{team.startZone3} (Zone 3)/{team.total} (Total)
                </td>
                <td className="px-2">
                  {team.leftStart}/{team.total} matches
                </td>
                <td className="px-2">
                  {team.climbNone} (None)/{team.climbPark} (Parked)/{team.climbClimb} (Climbed)/{team.total} (Total)
                </td>
                <td className="px-2">
                  {team.numOnChain0} (0 Bots)/{team.numOnChain1} (1 Bot)/{team.numOnChain2} (2 Bots)/{team.numOnChain3} (3 Bots)/{team.total} (Total)
                </td>
                <td className="px-2">
                  {team.trap}/{team.total} matches
                </td>
                <td className="px-2">
                  {team.spotlit}/{team.total} matches
                </td>
                <td
                  className={"px-2 py-4 d-flex flex-column"}
                >
                  <Button>
                    Expand
                  </Button>
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
