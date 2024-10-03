/* eslint-disable react/display-name */
import { Scouter } from "@/redux/adminDataSlice";
import { Scores } from "@/redux/scoresSlice";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event } from "@prisma/client";

interface Props {
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
  activeMatchName,
  handleMatchSelect,
  handleMatchDelete,
  scouters,
  handleScouterSelect,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  //map arrays for teams, then map arrays for everything from teamScores
  const [dataArray, setDataArray]:any[]=useState([{
      number: 868,
      name: "TechHOUNDS",
      total: 8,
      startZone1: 2,
      startZone2: 3,
      startZone3: 2,
      leftStart: 8,
      climbNone: 0,
      climbPark: 3,
      climbClimb: 5,
      numOnChain0: 0,
      numOnChain1: 7,
      numOnChain2: 1,
      numOnChain3: 0,
      trap: 0,
      spotlit: 1
}]);
 
// use ViewerDataSlice.
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
            {dataArray.map((team:{
              number:number,
              name:string,
              total: number,
              startZone1: number,
              startZone2: number,
              startZone3: number,
              leftStart: number,
              climbNone: number,
              climbPark: number,
              climbClimb: number,
              numOnChain0: number,
              numOnChain1: number,
              numOnChain2: number,
              numOnChain3: number,
              trap: number,
              spotlit: number,
            }) => (
              <tr key={team.number}>
                <td className=" table-secondary">
                  <p>Team {team.number}:<br />{team.name}</p>
                </td>
                <td className="px-2">
                  <p>{team.startZone1} (Zone 1)<br />{team.startZone2} (Zone 2)<br />{team.startZone3} (Zone 3)<br />{team.total} (Total)</p>
                </td>
                <td className="px-2">
                  <p>{team.leftStart}/{team.total}<br />matches</p>
                </td>
                <td className="px-2">
                  <p>{team.climbNone} (None)<br />{team.climbPark} (Parked)<br />{team.climbClimb} (Climbed)<br />{team.total} (Total)</p>
                </td>
                <td className="px-2">
                  <p>{team.numOnChain0} (0 Bots)<br />{team.numOnChain1} (1 Bot)<br />{team.numOnChain2} (2 Bots)<br />{team.numOnChain3} (3 Bots)<br />{team.total} (Total)</p>
                </td>
                <td className="px-2">
                  <p>{team.trap}/{team.total}<br />matches</p>
                </td>
                <td className="px-2">
                  <p>{team.spotlit}/{team.total}<br />matches</p>
                </td>
                <td
                  className={"px-2 py-4 d-flex flex-column"}
                >
                  <Button>
                    More Info
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
