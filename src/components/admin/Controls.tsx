/* eslint-disable react/display-name */
import { Heartbeat, Scouter } from "@/redux/adminDataSlice";
import React from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";

interface Props {}

export default function Controls({}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Controls</h1>

      <Button size="lg" className="d-flex mx-auto mb-3">
        Start Match Timer
      </Button>
      <Row className="">
        <Col>
          <Button variant="secondary" className="mb-2 mx-1">
            Edit Scouters
          </Button>
          <Button variant="secondary" className="mb-2 mx-1">
            Edit Teams
          </Button>
        </Col>
      </Row>
      <Button variant="secondary" className="mb-2">
        Import TBA Data
      </Button>
      <Button variant="secondary" className="mb-2">
        Generate Scouter Schedule
      </Button>
    </div>
  );
}
