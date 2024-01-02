/* eslint-disable react/display-name */
import { HeartbeatData, Scouter } from "@/redux/adminDataSlice";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface Props {
  heartbeats: HeartbeatData;
}

export default function ScouterStatus({ heartbeats }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Activity</h1>
      <ListGroup className="">
        {[
          { name: "Red 1", heartbeat: heartbeats.lastRed1Heartbeat },
          { name: "Red 2", heartbeat: heartbeats.lastRed2Heartbeat },
          { name: "Red 3", heartbeat: heartbeats.lastRed3Heartbeat },
          { name: "Blue 1", heartbeat: heartbeats.lastBlue1Heartbeat },
          { name: "Blue 2", heartbeat: heartbeats.lastBlue2Heartbeat },
          { name: "Blue 3", heartbeat: heartbeats.lastBlue3Heartbeat },
        ].map(({ name, heartbeat }: { name: string; heartbeat: Date }) => (
          <ListGroupItem
            key={name}
            className="d-flex flex-fill justify-content-between"
          >
            <div className="mx-2">{name}</div>
            <div className="mx-2">
              {((new Date().getTime() - heartbeat.getTime()) / 1000).toFixed(0)}{" "}
              seconds ago
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
