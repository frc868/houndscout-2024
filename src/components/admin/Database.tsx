/* eslint-disable react/display-name */
import { Match, Scouter, createMatchAsync } from "@/redux/adminDataSlice";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";
import DeleteButton from "../client/common/DeleteButton";
import MatchAddModal from "./MatchAddModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";

interface Props {
  matches: Match[];
  activeMatchName: string;
  handleMatchSelect: (name: string) => void;
  handleMatchDelete: (name: string) => void;
  scouters: Scouter[];
  handleScouterSelect: (matchName: string, station: string, id: number) => void;
}

export default function Database({
  matches,
  activeMatchName,
  handleMatchSelect,
  handleMatchDelete,
  scouters,
  handleScouterSelect,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const [showMatchAdd, setShowMatchAdd] = useState(false);
  
// Probably just easier to go by team.
  return (
    <div className="d-flex justify-content-center">
      <MatchAddModal
        show={showMatchAdd}
        handleClose={() => setShowMatchAdd(false)}
        handleSubmit={async (payload) => {
          await dispatch(
            createMatchAsync({
              eventCode: mainData.activeEvent?.code as string,
              ...payload,
            })
          );
          setShowMatchAdd(false);
        }}
      ></MatchAddModal>
      <div className="d-flex flex-column">
        <h1 className="text-center mb-3">Database (WIP)</h1>
        <Button
          className="w-25 mx-auto mb-3"
          onClick={() => setShowMatchAdd(true)}
        >
          Create new match
        </Button>
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
              <tr
                key={match.number}
                className={`${match.name === activeMatchName && "fw-bold"}`}
              >
                <td
                  className={`px-2 ${
                    match.name === activeMatchName && "table-secondary"
                  }`}
                >
                  Match {match.number}
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red1}{" "}
                 
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red2}{" "}
                  
                </td>
                <td className="px-2 table-danger">
                  {match.teamNumbers.red3}{" "}
                  
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue1}{" "}
                 
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue2}{" "}
                  
                </td>
                <td className="px-2 table-primary">
                  {match.teamNumbers.blue3}{" "}
                  
                </td>
                <td
                  className={`px-2 py-4 d-flex flex-column ${
                    match.name === activeMatchName && "table-secondary"
                  }`}
                >

                  <DeleteButton
                    variant={
                      match.name === activeMatchName
                        ? "danger"
                        : "outline-danger"
                    }
                    handleDelete={() => handleMatchDelete(match.name)}
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
