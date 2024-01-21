/* eslint-disable react/display-name */
import { Heartbeat, Scouter } from "@/redux/adminDataSlice";
import React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

interface Props {
  scouters: {
    red1: Scouter;
    red2: Scouter;
    red3: Scouter;
    blue1: Scouter;
    blue2: Scouter;
    blue3: Scouter;
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

export default function Activity({ scouters, heartbeats }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Activity</h1>
      <ListGroup className="w-100">
        {[
          { name: "Red 1", scouter: scouters.red1, heartbeat: heartbeats.red1 },
          { name: "Red 2", scouter: scouters.red2, heartbeat: heartbeats.red2 },
          { name: "Red 3", scouter: scouters.red3, heartbeat: heartbeats.red3 },
          {
            name: "Blue 1",
            scouter: scouters.blue1,
            heartbeat: heartbeats.blue1,
          },
          {
            name: "Blue 2",
            scouter: scouters.blue2,
            heartbeat: heartbeats.blue2,
          },
          {
            name: "Blue 3",
            scouter: scouters.blue3,
            heartbeat: heartbeats.blue3,
          },
        ].map(
          ({
            name,
            scouter,
            heartbeat,
          }: {
            name: string;
            scouter: Scouter;
            heartbeat: Heartbeat;
          }) => (
            <ListGroupItem key={name}>
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
