import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";

interface Props {
  rankings: Ranking[];
}
export default function RankingsContent({rankings}: Props) {
  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sorting function
  const sortedRankings = useMemo(() => {
    if (!sortField) return rankings;

    return [...rankings].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    
  }, [rankings, sortField, sortDirection]);

  // Calculate max values for coloring
  const maxValues = useMemo(() => {
    const maxes: Record<string, number> = {};
    [...rankings].forEach((r: Ranking) => {
      Object.entries(r).forEach(([key, value]) => {
        if (typeof value === "number" && key !== "team") {
          maxes[key] = Math.max(maxes[key] || 0, value);
        }
      });
    });
    return maxes;
  }, [rankings]);

  // Handler to sort by column
  const handleSort = (field: keyof Ranking) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Determine cell color based on value
  const getColor = (
    value: number,
    maxValue: number,
    category: string
  ): React.CSSProperties => {
    if (category === "team") return {};

    const intensity = value / maxValue;
    let color: string;
    // Define your color logic here
    color = `rgba(0, 0, 255, ${intensity})`; // Example color logic
    return { backgroundColor: color };
  };

  return (
    <div
      style={{
        height: "calc(100% - 2*24px)",
        width: "calc(100% - 2*24px)",
        color: "white",
      }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Welcome to the HoundScout data viewer! (WIP)</h1>
      <p>This is a built-in tool that provides easy access to the collected data. Feel free to use this page to make the best possible decisions!</p>
      <Table
        bordered
        hover
        variant="dark"
        className="table-responsive"
      >
        <thead>
          <tr>
            {/* Clickable table headers for sorting */}
            {[
              "Team",
              "Total Games",
              "Mobility",
              "Auto Coral",
              "Auto Algae",
              "Teleop Coral",
              "Teleop Algae",
              "Endgame",
              "Incap",
              "Defense",
            ].map((header) => (
              <th
                key={header}
                onClick={() =>
                  handleSort(
                    header.toLowerCase().replace(/ /g, "") as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Once the team selection function in admin is working, that can be modified for the picklist. */}
          {sortedRankings.map((r, idx) => (
            <tr key={r.teamNumber}>
              <td>{r.teamNumber}</td>
              <td>{r.total}</td>
              <td>{r.mobility}</td>
              <td>
                L1: {r.autoCoralLevel1Scored}<br />
                L2: {r.autoCoralLevel2Scored}<br />
                L3: {r.autoCoralLevel3Scored}<br />
                L4: {r.autoCoralLevel4Scored}<br />
              </td>
              <td>
                Net: {r.autoAlgaeNetScored}<br />
                Processor: {r.autoAlgaeProcessorScored}<br />
              </td>
              <td>
                L1: {r.teleopCoralLevel1Scored}<br />
                L2: {r.teleopCoralLevel2Scored}<br />
                L3: {r.teleopCoralLevel3Scored}<br />
                L4: {r.teleopCoralLevel4Scored}<br />
              </td>
              <td>
                Net: {r.teleopAlgaeNetScored}<br />
                Processor: {r.teleopAlgaeProcessorScored}<br />
              </td>
              <td>
                Parked: {r.parked}<br />
                Shallow: {r.shallow}<br />
                Deep: {r.deep}<br />
              </td>
              <td>{r.incap}</td>
              <td>{r.defense}</td>
              {/* {Object.entries(r).map(([key, value]) =>
                key !== "team" ? (
                  <td
                    key={key}
                    style={getColor(value as number, maxValues[key], key)}
                  >
                    {value}
                  </td>
                ) : (
                  <td key={key}>{value}</td>
                )
              )} */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
