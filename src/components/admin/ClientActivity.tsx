/* eslint-disable react/display-name */
import Blue2 from "@/app/client/blue2/page";
import { Heartbeat, Scouter } from "@/lib/enums";
import React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

interface Props {
  scouters?: {
    red1?: Scouter;
    red2?: Scouter;
    red3?: Scouter;
    blue1?: Scouter;
    blue2?: Scouter;
    blue3?: Scouter;
  };
  submitted?: {
    red1?: boolean;
    red2?: boolean;
    red3?: boolean;
    blue1?: boolean;
    blue2?: boolean;
    blue3?: boolean;
  };
  cancelled?: {
    red1?: boolean;
    red2?: boolean;
    red3?: boolean;
    blue1?: boolean;
    blue2?: boolean;
    blue3?: boolean;
  };
  heartbeats: {
    red1: Heartbeat;
    red2: Heartbeat;
    red3: Heartbeat;
    blue1: Heartbeat;
    blue2: Heartbeat;
    blue3: Heartbeat;
  };
}

//Lists heartbeats for each station, including how long ago the device's last communication was and which phase the scouter is on.
export default function Activity({ scouters, submitted, cancelled, heartbeats }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Activity</h1>
      <ListGroup className="w-100">
        {[
          {
            name: "Red 1",
            scouter: scouters?.red1 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.red1,
            cancelled: cancelled?.red1,
            heartbeat: heartbeats.red1,
          },
          {
            name: "Red 2",
            scouter: scouters?.red2 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.red2,
            cancelled: cancelled?.red2,
            heartbeat: heartbeats.red2,
          },
          {
            name: "Red 3",
            scouter: scouters?.red3 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.red3,
            cancelled: cancelled?.red3,
            heartbeat: heartbeats.red3,
          },
          {
            name: "Blue 1",
            scouter: scouters?.blue1 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.blue1,
            cancelled: cancelled?.blue1,
            heartbeat: heartbeats.blue1,
          },
          {
            name: "Blue 2",
            scouter: scouters?.blue2 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.blue2,
            cancelled: cancelled?.blue2,
            heartbeat: heartbeats.blue2,
          },
          {
            name: "Blue 3",
            scouter: scouters?.blue3 || { name: "Unassigned", active: false, id: -1 },
            submitted: submitted?.blue3,
            cancelled: cancelled?.blue3,
            heartbeat: heartbeats.blue3,
          },
        ].map(
          ({
            name,
            scouter,
            submitted,
            cancelled,
            heartbeat,
          }: {
            name: string;
            scouter: Scouter;
            submitted?: boolean;
            cancelled?: boolean;
            heartbeat: Heartbeat;
          }) => (
            <ListGroupItem key={name} className={submitted?"bg-success-subtle":cancelled?"bg-danger-subtle":""}>
              <Row>
                <Col md={2} className="text-start">
                  {name}
                </Col>
                <Col md={3} className="text-start">
                  {scouter.name}
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                  {heartbeat.section.toUpperCase()}
                </Col>
                <Col
                  md={5}
                  className="d-flex justify-content-end align-items-center"
                >
                  <BounceLoader
                    color={
                      new Date().getTime() - heartbeat.time < 5000
                        ? "#198754"
                        : "#DC3545"
                    }
                    // Displays a red signal if the last communication was 5 seconds ago, otherwise green.
                    size={10}
                    className="me-1"
                  />
                  {((new Date().getTime() - heartbeat.time) / 1000).toFixed(0)}{" "}
                  seconds ago
                </Col>
              </Row>
            </ListGroupItem>
          )
        )}
      </ListGroup>
    </div>
  );
}
