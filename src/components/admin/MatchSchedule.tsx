/* eslint-disable react/display-name */
import { Match, Scouter } from "@/redux/adminDataSlice";
import React from "react";
import { Button, Table } from "react-bootstrap";
import ScoutersDropdown from "./ScouterDropdown";

interface Props {
  matches: Match[];
  activeMatchName: string;
  handleMatchSelect: (name: string) => void;
  scouters: Scouter[];
  handleScouterSelect: (matchName: string, station: string, id: number) => void;
}

export default function MatchSchedule({
  matches,
  activeMatchName,
  handleMatchSelect,
  scouters,
  handleScouterSelect,
}: Props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column">
        <h1 className="text-center mb-3">Match Schedule</h1>
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
                  className={`px-2 d-flex flex-column ${
                    match.name === activeMatchName && "table-secondary"
                  }`}
                >
                  <Button
                    size="sm"
                    variant={
                      match.name === activeMatchName
                        ? "primary"
                        : "outline-primary"
                    }
                    className="mb-1"
                    onClick={() => handleMatchSelect(match.name)}
                  >
                    Select
                  </Button>
                  <Button
                    size="sm"
                    className="mt-1"
                    variant={
                      match.name === activeMatchName
                        ? "danger"
                        : "outline-danger"
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
