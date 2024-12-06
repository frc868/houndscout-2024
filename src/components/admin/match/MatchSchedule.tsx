/* eslint-disable react/display-name */
import { Match, Team, Scouter, createMatchAsync, deleteMatchAsync, setActiveMatchAsync } from "@/redux/adminDataSlice";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";
import DeleteButton from "./DeleteButton";
import MatchAddModal from "./MatchAddModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event } from "@prisma/client"
import { MoonLoader } from "react-spinners";
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
  const [showMatchAdd, setShowMatchAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div className="d-flex justify-content-center">
      <MatchAddModal
        teams={teams as Team[]}
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
        <h1 className="text-center mb-3">Match Schedule</h1>
        <MoonLoader
          className="mx-2"
          color={"black"}
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Button
          className="w-25 mx-auto mb-3"
          onClick={() => {setShowMatchAdd(true);}}
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
                    setLoading(true);
                    await dispatch(
                      setActiveMatchAsync({
                        eventCode: mainData.activeEvent?.code as string,
                        matchName: match.name,
                      })
                    )
                    setLoading(false);
                  }}
                  >
                    {match.name === activeMatchName?"Current Active":"Set As Active"}
                  </Button>
                  <DeleteButton
                    variant={
                      match.name === activeMatchName
                        ? "danger"
                        : "outline-danger"
                    }
                    handleDelete={async () => {
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
