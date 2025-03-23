/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form, Table } from "react-bootstrap";
import { useState, useMemo, useCallback } from "react";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide, AlgaeIntakeLocation, AlgaeScoringLocation, CoralScoringEvent, AlgaeScoringEvent } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import TeamDropdown from "@/components/TeamDropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";
import FieldMap from "../FieldMap";

interface Props {
  rankings: Ranking[];
}

export default function EventsContent({rankings}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [coralIntake, setCoralIntake] = useState({
    ...(Object.fromEntries(Object.values(CoralIntakeLocation).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
  });
  const [coralLevel, setCoralLevel] = useState({
    ...(Object.fromEntries(Object.values(CoralScoringLevel).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
  });
  const [coralSide, setCoralSide] = useState({
    ...(Object.fromEntries(Object.values(CoralScoringSide).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
  });

  const [algaeIntake, setAlgaeIntake] = useState({
    ...(Object.fromEntries(Object.values(AlgaeIntakeLocation).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
  });
  const [algaeScoring, setAlgaeScoring] = useState({
    ...(Object.fromEntries(Object.values(AlgaeScoringLocation).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
  });

  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const coralFilter = useCallback((event: CoralScoringEvent)=>{
    if (Object.values(coralIntake).some(value => value === true)&&(event.intakeLocation==undefined||event.intakeLocation==null||coralIntake[event.intakeLocation] !== true)) return false;
    if (Object.values(coralLevel).some(value => value === true)&&(event.scoringLevel==undefined||event.scoringLevel==null||coralLevel[event.scoringLevel] !== true)) return false;
    if (Object.values(coralSide).some(value => value === true)&&(event.scoringSide==undefined||event.scoringSide==null||coralSide[event.scoringSide] !== true)) return false;
    return true;
  }, [coralIntake, coralLevel, coralSide])

  const algaeFilter = useCallback((event: AlgaeScoringEvent)=>{
    if (Object.values(algaeIntake).some(value => value === true)&&(event.intakeLocation==undefined||event.intakeLocation==null||algaeIntake[event.intakeLocation] !== true)) return false;
    if (Object.values(algaeScoring).some(value => value === true)&&(event.scoringLocation==undefined||event.scoringLocation==null||algaeScoring[event.scoringLocation] !== true)) return false;
    return true;
  }, [algaeIntake, algaeScoring])

  // Sorting function
  const sortedRankings = useMemo(() => {
    let newRankings = rankings.map((r)=>{
      let totalgames=r.totalgames;
      return {
        ...r,
        coralpermatch: totalgames==0?null:r.teamScores.filter(score=>score.submitted).reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(coralFilter).length;
          return total + gameAmount;
        }, 0) / (r.totalgames),
        coralaccuracy: totalgames==0?null:r.teamScores.filter(score=>score.submitted).reduce((total, score) => {
          const gameAmount = score.CoralScoringEvents.filter(coralFilter).filter(
            (event) => !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / (r.totalgames),
        coralcycletime: totalgames==0?null:r.teamScores.filter(score=>score.submitted).reduce((total, score) => {
          const totalMatchTime = score.CoralScoringEvents.filter(coralFilter).reduce(
            (sum, segment) => 
              sum +
              (Number(segment.timestampScored) -
                Number(segment.timestampPickedUp)),
            0) / score.CoralScoringEvents.length;
          return total + totalMatchTime;
        }, 0) / (r.teamScores.length * 1000),
        algaepermatch: totalgames==0?null:r.teamScores.filter(score=>score.submitted).filter(score=>score.submitted).reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(algaeFilter).length;
          return total + gameAmount;
        }, 0) / (r.totalgames),
        algaeaccuracy: totalgames==0?null:r.teamScores.filter(score=>score.submitted).reduce((total, score) => {
          const gameAmount = score.AlgaeScoringEvents.filter(algaeFilter).filter(
            (event) => !event.failedScoring
          ).length;
          return total + gameAmount;
        }, 0) / (r.totalgames),
        algaecycletime: totalgames==0?null:r.teamScores.filter(score=>score.submitted).reduce((total, score) => {
          const totalMatchTime = score.AlgaeScoringEvents.filter(algaeFilter).reduce(
            (sum, segment) => 
              sum +
              (Number(segment.timestampScored) -
                Number(segment.timestampPickedUp)),
            0) / score.AlgaeScoringEvents.length;
          return total + totalMatchTime;
        }, 0) / (r.totalgames * 1000)
      }
    })
    if (!sortField) return [...newRankings].sort((a, b) => {
      if(a.firstpicklist&&!b.firstpicklist) return -1;
      else if(!a.firstpicklist&&b.firstpicklist) return 1;
      else if(a.secondpicklist&&!b.secondpicklist) return -1;
      else if(!a.secondpicklist&&b.secondpicklist) return 1;
      else if(a.teamnumber<b.teamnumber) return -1;
        else if(a.teamnumber>b.teamnumber) return 1;
        else return 0;
    });
    //-1=b above a, 1= a above b
    return [...newRankings].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA==undefined||valueA==null) return 1;
      else if (valueB==undefined||valueB==null) return -1;
      else if (valueA < valueB) {
        if (sortDirection === "asc") return -1;
        else return 1;
      }else if (valueA > valueB) {
        if (sortDirection === "asc") return 1;
        else return -1;
      }else if (valueA == valueB){
        if(a.firstpicklist&&!b.firstpicklist) return -1;
        else if(!a.firstpicklist&&b.firstpicklist) return 1;
        else if(a.secondpicklist&&!b.secondpicklist) return -1;
        else if(!a.secondpicklist&&b.secondpicklist) return 1;
        else if(a.teamnumber<b.teamnumber) return -1;
        else if(a.teamnumber>b.teamnumber) return 1;
        else return 0;
      }
      return 0;
    });
    
  }, [rankings, sortField, coralFilter, algaeFilter, sortDirection]);

  // Calculate max values for coloring
  const maxValues = useMemo(() => {
    const maxes: Record<string, number> = {};
    [...sortedRankings].forEach((r: Ranking) => {
      Object.entries(r).forEach(([key, value]) => {
        if (typeof value === "number" && key !== "team") {
          maxes[key] = Math.max(maxes[key] || 0, value);
        }
      });
    });
    return maxes;
  }, [sortedRankings]);

  // Handler to sort by column
  const handleSort = (field: keyof Ranking) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
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
      width: "calc(85vw - 2*24px)",
      color: "white",
      overflowX: "auto",
      overflowY: "auto",
      float: "right"
    }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Team Scoring Event Data</h1>
      <FieldMap />
      <Row className="d-flex flex-row">
        <Col md={6}>
          <h3 className="mr-2">Coral Scoring Events:</h3>
        </Col>
        <Col md={6}>
          <h3 className="mr-2">Algae Scoring Events:</h3>
        </Col>
      </Row>
      <Row className="d-flex flex-row">
        <Col md={2}>
          <h5>Coral Intake Location:</h5>
          {Object.keys(CoralIntakeLocation).map((type) => {
            return(
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={coralIntake[type]}
                onChange={() => {setCoralIntake((prev) => ({...prev, [type]: !prev[type],}))}}
              />
            )
          })}
        </Col>
        <Col md={2}>
          <h5>Coral Scoring Level:</h5>
          {Object.keys(CoralScoringLevel).map((type) => {
            return(
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={coralLevel[type]}
                onChange={() => {setCoralLevel((prev) => ({...prev, [type]: !prev[type],}))}}
              />
            )
          })}
        </Col>
        <Col md={2}>
          <h5>Coral Scoring Side (Auto):</h5>
          {Object.keys(CoralScoringSide).map((type) => {
            return(
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={coralSide[type]}
                onChange={() => {setCoralSide((prev) => ({...prev, [type]: !prev[type],}))}}
              />
            )
          })}
        </Col>
        <Col md={3}>
          <h5>Algae Intake Location:</h5>
          {Object.keys(AlgaeIntakeLocation).map((type) => {
            return(
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={algaeIntake[type]}
                onChange={() => {setAlgaeIntake((prev) => ({...prev, [type]: !prev[type],}))}}
              />
            )
          })}
        </Col>
        <Col md={3}>
          <h5>Algae Scoring Location:</h5>
          {Object.keys(AlgaeScoringLocation).map((type) => {
            return(
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={algaeScoring[type]}
                onChange={() => {setAlgaeScoring((prev) => ({...prev, [type]: !prev[type],}))}}
              />
            )
          })}
        </Col>
      </Row>
      <Table
        bordered
        variant="dark"
        className="table-responsive mt-1"
      >
        <thead>
          <tr>
            {/* Clickable table headers for sorting */}
            {[
              "Team Number",
              "Coral Per Match",
              "Coral Accuracy",
              "Coral Cycle Time",
              "Algae Per Match",
              "Algae Accuracy",
              "Algae Cycle Time",
              "First Picklist",
              "Second Picklist",
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
                <i className={` bi ${(header.toLowerCase().replace(/ /g, "") as keyof Ranking!=sortField) ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((r, idx) => (
            <tr key={r.teamnumber}>
              <td>{r.teamnumber}</td>
              <td style={getColor(r.coralpermatch as number, maxValues.coralpermatch, "coralpermatch")}>{r.coralpermatch}</td>
              <td style={getColor(r.coralaccuracy as number, maxValues.coralaccuracy, "coralaccuracy")}>{r.coralaccuracy}</td>
              <td style={getColor(r.coralcycletime as number, maxValues.coralcycletime, "coralcycletime")}>{r.coralcycletime}</td>
              <td style={getColor(r.algaepermatch as number, maxValues.algaepermatch, "algaepermatch")}>{r.algaepermatch}</td>
              <td style={getColor(r.algaeaccuracy as number, maxValues.algaeaccuracy, "algaeaccuracy")}>{r.algaeaccuracy}</td>
              <td style={getColor(r.algaecycletime as number, maxValues.algaecycletime, "algaecycletime")}>{r.algaecycletime}</td>
              <td>
                <div
                  className={"d-flex justify-content-center align-items-center"}
                  style={{
                    width: "auto",
                    height: "100%",
                    fontSize: "35pt",
                    color: "gold",
                    cursor: "pointer",
                  }}
                  onMouseDown={async () => {
                    await dispatch(
                      updatePicklistsAsync({
                        teamNumber: r.teamnumber as number,
                        firstPicklist: !r.firstpicklist,
                        secondPicklist: r.secondpicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.firstpicklist ? "bi-star-fill" : "bi-star"}`} />
                </div>
              </td>
              <td>
                <div
                  className={"d-flex justify-content-center align-items-center"}
                  style={{
                    width: "auto",
                    height: "100%",
                    fontSize: "35pt",
                    color: "silver",
                    cursor: "pointer",
                  }}
                  onMouseDown={async () => {
                    await dispatch(
                      updatePicklistsAsync({
                        teamNumber: r.teamnumber as number,
                        firstPicklist: r.firstpicklist,
                        secondPicklist: !r.secondpicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.secondpicklist ? "bi-star-fill" : "bi-star"}`} />
                </div>
              </td>
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
