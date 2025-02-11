import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";

interface Props {
  rankings: Ranking[];
}
export default function PitContent({rankings}: Props) {
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
        <h1>Pit Scouting Data (WIP)</h1>
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
                "Games",
                "Mobility",
                // "Coral Intake Data",
                // "Algae Intake Data",
                // "Coral Scoring Data",
                // "Algae Scoring Data",
                "Endgame Data",
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
                {/* <td>
                  S1 (Auto): {r.CoralAutoStation1Intaked}<br />
                  G1 (Auto): {r.CoralAutoGround1Intaked}<br />
                  G2 (Auto): {r.CoralAutoGround2Intaked}<br />
                  G3 (Auto): {r.CoralAutoGround3Intaked}<br />
                  S2 (Auto): {r.CoralAutoStation2Intaked}<br />
                  Ground (Teleop): {r.CoralTeleopGroundIntaked}<br />
                  Station (Teleop): {r.CoralTeleopStationIntaked}<br />
                </td>
                <td>
                  G1 (Auto): {r.AlgaeAutoGround1Intaked}<br />
                  G2 (Auto): {r.AlgaeAutoGround2Intaked}<br />
                  G3 (Auto): {r.AlgaeAutoGround3Intaked}<br />
                  R1 (Auto): {r.AlgaeAutoReef1Intaked}<br />
                  R2 (Auto): {r.AlgaeAutoReef2Intaked}<br />
                  R3 (Auto): {r.AlgaeAutoReef3Intaked}<br />
                  R4 (Auto): {r.AlgaeAutoReef4Intaked}<br />
                  R5 (Auto): {r.AlgaeAutoReef5Intaked}<br />
                  R6 (Auto): {r.AlgaeAutoReef6Intaked}<br />
                  Ground (Teleop): {r.AlgaeTeleopGroundIntaked}<br />
                  Reef (Teleop): {r.AlgaeTeleopReefIntaked}<br />
                </td>
                <td>
                  L1: {r.CoralLevel1Scored}/{r.CoralLevel1Attempted}<br />
                  L2: {r.CoralLevel2Scored}/{r.CoralLevel2Attempted}<br />
                  L3: {r.CoralLevel3Scored}/{r.CoralLevel3Attempted}<br />
                  L4: {r.CoralLevel4Scored}/{r.CoralLevel4Attempted}<br />
                  Reef S1 (Auto): {r.CoralAutoSide1Scored}/{r.CoralAutoSide1Attempted}<br />
                  Reef S2 (Auto): {r.CoralAutoSide2Scored}/{r.CoralAutoSide2Attempted}<br />
                  Reef S3 (Auto): {r.CoralAutoSide3Scored}/{r.CoralAutoSide3Attempted}<br />
                  Reef S4 (Auto): {r.CoralAutoSide4Scored}/{r.CoralAutoSide4Attempted}<br />
                  Reef S5 (Auto): {r.CoralAutoSide5Scored}/{r.CoralAutoSide5Attempted}<br />
                  Reef S6 (Auto): {r.CoralAutoSide6Scored}/{r.CoralAutoSide6Attempted}<br />
                </td>
                <td>
                  Net: {r.AlgaeNetScored}/{r.AlgaeNetAttempted}<br />
                  Processor: {r.AlgaeProcessorScored}/{r.AlgaeNetAttempted}<br />
                </td> */}
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
