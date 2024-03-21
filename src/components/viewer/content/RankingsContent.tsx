import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { Table } from "react-bootstrap";

interface Rankings {
  team: string;
  mobility: number;
  autoSpeaker: number;
  autoMisses: number;
  combinedScoring: number;
  speaker: number;
  speakerMisses: number;
  amp: number;
  ampMisses: number;
  climb: number;
  ensemble: number;
  trap: number;
  incap: number;
  defense: number;
}

export default function RankingsContent() {
  const viewerData = useSelector((state: ReduxState) => state?.viewerData);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sorting function
  const sortedRankings = useMemo(() => {
    const rankings = viewerData.rankings || [];
    if (!sortField) return rankings;

    return [...rankings].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [viewerData.rankings, sortField, sortDirection]);

  // Calculate max values for coloring
  const maxValues = useMemo(() => {
    const maxes: Record<string, number> = {};
    viewerData.rankings?.forEach((r: Rankings) => {
      Object.entries(r).forEach(([key, value]) => {
        if (typeof value === "number" && key !== "team") {
          maxes[key] = Math.max(maxes[key] || 0, value);
        }
      });
    });
    return maxes;
  }, [viewerData.rankings]);

  // Handler to sort by column
  const handleSort = (field: string) => {
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
      style={{ height: "calc(100% - 2*24px)", width: "calc(100% - 2*24px)" }}
      className="m-4 bg-dark"
    >
      <Table
        bordered
        hover
        variant="dark"
        className="font-monospace text-center table-responsive"
      >
        <thead>
          <tr>
            {/* Clickable table headers for sorting */}
            {[
              "Team",
              "Mobility",
              "Auto Speaker",
              "Auto Misses",
              "Combined Scoring",
              "Speaker",
              "Speaker Misses",
              "Amp",
              "Amp Misses",
              "Climb",
              "Ensemble",
              "Trap",
              "Incap",
              "Defense",
            ].map((header) => (
              <th
                key={header}
                onClick={() =>
                  handleSort(header.toLowerCase().replace(/ /g, ""))
                }
                style={{ cursor: "pointer" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((r, idx) => (
            <tr key={r.team}>
              <td>{idx + 1}</td>
              {Object.entries(r).map(([key, value]) =>
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
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
