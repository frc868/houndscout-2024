/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form, Table } from "react-bootstrap";
import { useState, useMemo } from "react";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide, AlgaeIntakeLocation, AlgaeScoringLocation, CoralScoringEvent, AlgaeScoringEvent } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import TeamDropdown from "@/components/admin/TeamDropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";

interface Props {
  rankings: Ranking[];
}

export default function EventsContent({rankings}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [coralIntake, setCoralIntake] = useState<CoralIntakeLocation|undefined>(undefined);
  const [coralLevel, setCoralLevel] = useState<CoralScoringLevel|undefined>(undefined);
  const [coralSide, setCoralSide] = useState<CoralScoringSide|undefined>(undefined);
  const [algaeIntake, setAlgaeIntake] = useState<AlgaeIntakeLocation|undefined>(undefined);
  const [algaeScoring, setAlgaeScoring] = useState<AlgaeScoringLocation|undefined>(undefined);

  const [team, setTeam]=useState<Ranking | undefined>();

  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filterCoral = (scoringEvent: CoralScoringEvent)=>{
    if (coralIntake && scoringEvent.intakeLocation!=coralIntake) return false;
    if (coralLevel && scoringEvent.scoringLevel!=coralLevel) return false;
    if (coralSide && scoringEvent.scoringSide!=coralSide) return false;
    return true;
  }

  const filterAlgae = (scoringEvent: AlgaeScoringEvent)=>{
    if (algaeIntake && scoringEvent.intakeLocation!=algaeIntake) return false;
    if (algaeScoring && scoringEvent.scoringLocation!=algaeScoring) return false;
    return true;
  }

  // Sorting function
  const sortedRankings = useMemo(() => {
    if (!sortField) return rankings;

    return [...rankings].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA==undefined||valueA==null) return -1;
      if (valueB==undefined||valueB==null) return 1;
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
      overflowX: "auto",
      overflowY: "auto",
      float: "right"
    }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Team Scoring Event Data (WIP)</h1>
      <div className="position-relative mt-4" style={{width: "100%"}}>
          <img
              alt=""
              style={{
                  width: "40%",
                  height: "auto",
                  left: "60%",
              }}
              src={"/assets/blue_side.png"}
          />
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "33%" }}
          >
            R1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "44%" }}
          >
            R2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "48%" }}
          >
            R3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "44%" }}
          >
            R4
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "33%" }}
          >
            R5
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "29%" }}
          >
            R6
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "22%" }}
          >
            G1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "22%" }}
          >
            G2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "22%" }}
          >
            G3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "12%", left: "15%" }}
          >
            S1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "80%", left: "15%" }}
          >
            S2
          </p>
      </div>
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
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralIntake}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralIntake(undefined)}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralIntake("AUTOPRELOAD")}>{CoralIntakeLocation.AUTOPRELOAD}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralIntake("AUTOGROUND1")}>{CoralIntakeLocation.AUTOGROUND1}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralIntake("AUTOGROUND2")}>{CoralIntakeLocation.AUTOGROUND2}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralIntake("AUTOGROUND3")}>{CoralIntakeLocation.AUTOGROUND3}</Dropdown.Item>
                <Dropdown.Item key={6} onMouseDown={() => setCoralIntake("AUTOSTATION1")}>{CoralIntakeLocation.AUTOSTATION1}</Dropdown.Item>
                <Dropdown.Item key={7} onMouseDown={() => setCoralIntake("AUTOSTATION2")}>{CoralIntakeLocation.AUTOSTATION2}</Dropdown.Item>
                <Dropdown.Item key={8} onMouseDown={() => setCoralIntake("TELEOPGROUND")}>{CoralIntakeLocation.TELEOPGROUND}</Dropdown.Item>
                <Dropdown.Item key={9} onMouseDown={() => setCoralIntake("TELEOPSTATION")}>{CoralIntakeLocation.TELEOPSTATION}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <h5>Coral Scoring Level:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralLevel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralLevel(undefined)}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralLevel("LEVEL1")}>{CoralScoringLevel.LEVEL1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralLevel("LEVEL2")}>{CoralScoringLevel.LEVEL2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralLevel("LEVEL3")}>{CoralScoringLevel.LEVEL3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralLevel("LEVEL4")}>{CoralScoringLevel.LEVEL4}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <h5>Coral Scoring Side (Auto):</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {coralSide}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setCoralSide(undefined)}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setCoralSide("SIDE1")}>{CoralScoringSide.SIDE1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setCoralSide("SIDE2")}>{CoralScoringSide.SIDE2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralSide("SIDE3")}>{CoralScoringSide.SIDE3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralSide("SIDE4")}>{CoralScoringSide.SIDE4}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setCoralSide("SIDE3")}>{CoralScoringSide.SIDE5}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setCoralSide("SIDE4")}>{CoralScoringSide.SIDE6}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <h5>Algae Intake Location:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {algaeIntake}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setAlgaeIntake(undefined)}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setAlgaeIntake("AUTOGROUND1")}>{AlgaeIntakeLocation.AUTOGROUND1}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setAlgaeIntake("AUTOGROUND2")}>{AlgaeIntakeLocation.AUTOGROUND2}</Dropdown.Item>
                <Dropdown.Item key={4} onMouseDown={() => setAlgaeIntake("AUTOGROUND3")}>{AlgaeIntakeLocation.AUTOGROUND3}</Dropdown.Item>
                <Dropdown.Item key={5} onMouseDown={() => setAlgaeIntake("AUTOREEF1")}>{AlgaeIntakeLocation.AUTOREEF1}</Dropdown.Item>
                <Dropdown.Item key={6} onMouseDown={() => setAlgaeIntake("AUTOREEF2")}>{AlgaeIntakeLocation.AUTOREEF2}</Dropdown.Item>
                <Dropdown.Item key={7} onMouseDown={() => setAlgaeIntake("AUTOREEF3")}>{AlgaeIntakeLocation.AUTOREEF3}</Dropdown.Item>
                <Dropdown.Item key={8} onMouseDown={() => setAlgaeIntake("AUTOREEF4")}>{AlgaeIntakeLocation.AUTOREEF4}</Dropdown.Item>
                <Dropdown.Item key={9} onMouseDown={() => setAlgaeIntake("AUTOREEF5")}>{AlgaeIntakeLocation.AUTOREEF5}</Dropdown.Item>
                <Dropdown.Item key={10} onMouseDown={() => setAlgaeIntake("AUTOREEF6")}>{AlgaeIntakeLocation.AUTOREEF6}</Dropdown.Item>
                <Dropdown.Item key={11} onMouseDown={() => setAlgaeIntake("TELEOPGROUND")}>{AlgaeIntakeLocation.TELEOPGROUND}</Dropdown.Item>
                <Dropdown.Item key={12} onMouseDown={() => setAlgaeIntake("TELEOPREEF")}>{AlgaeIntakeLocation.TELEOPREEF}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <h5>Algae Scoring Location:</h5>
          <Dropdown className="mt-1" style={{ width: '100%' }}>
            <Dropdown.Toggle
              variant="secondary"
            >
              {algaeScoring}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ul className="list-unstyled">
                <Dropdown.Item key={1} onMouseDown={() => setAlgaeScoring(undefined)}>N/A</Dropdown.Item>
                <Dropdown.Item key={2} onMouseDown={() => setAlgaeScoring("NET")}>{AlgaeScoringLocation.NET}</Dropdown.Item>
                <Dropdown.Item key={3} onMouseDown={() => setAlgaeScoring("PROCESSOR")}>{AlgaeScoringLocation.PROCESSOR}</Dropdown.Item>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
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
              "Coral Inaked",
              "Coral Scored",
              "Coral Cycle Times",
              "Algae Inaked",
              "Algae Scored",
              "Algae Cycle Times",
              "1st Picklist",
              "2nd Picklist",
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
                <i className={` bi ${(header.toLowerCase().replace(/ /g, "") as keyof Ranking!=sortField) ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-up" : "bi-chevron-bar-down"}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((r, idx) => (
            <tr key={r.teamNumber}>
              <td 
                // key={r}  
                // style={getColor(idx as number, maxValues[r], r)}
              >
                {r.teamNumber}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const gameAmount = score.CoralScoringEvents.filter(filterCoral).length;
                  return total + gameAmount;
                }, 0) / (r.teamScores.length)}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const gameAmount = score.CoralScoringEvents.filter(filterCoral).filter(
                    (event) => !event.failedScoring
                  ).length;
                  return total + gameAmount;
                }, 0) / (r.teamScores.length)}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const totalMatchTime = score.CoralScoringEvents.filter(filterCoral).reduce(
                    (sum, segment) => 
                      sum +
                      (Number(segment.timestampScored) -
                        Number(segment.timestampPickedUp)),
                    0) / score.CoralScoringEvents.length;
                  return total + totalMatchTime;
                }, 0) / (r.teamScores.length * 1000)}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const gameAmount = score.AlgaeScoringEvents.filter(filterAlgae).length;
                  return total + gameAmount;
                }, 0) / (r.teamScores.length)}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const gameAmount = score.AlgaeScoringEvents.filter(filterAlgae).filter(
                    (event) =>  !event.failedScoring
                  ).length;
                  return total + gameAmount;
                }, 0) / (r.teamScores.length)}
              </td>
              <td>
                {r.teamScores.reduce((total, score) => {
                  const totalMatchTime = score.AlgaeScoringEvents.filter(filterAlgae).reduce(
                    (sum, segment) => 
                      sum +
                      (Number(segment.timestampScored) -
                        Number(segment.timestampPickedUp)),
                    0) / score.AlgaeScoringEvents.length;
                  return total + totalMatchTime;
                }, 0) / (r.teamScores.length * 1000)}
              </td>
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
                        teamNumber: r.teamNumber as number,
                        firstPicklist: !r.firstPicklist,
                        secondPicklist: r.secondPicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.firstPicklist ? "bi-star-fill" : "bi-star"}`} />
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
                        teamNumber: r.teamNumber as number,
                        firstPicklist: r.firstPicklist,
                        secondPicklist: !r.secondPicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.secondPicklist ? "bi-star-fill" : "bi-star"}`} />
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
