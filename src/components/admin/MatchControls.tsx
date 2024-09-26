/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TBADataModal from "./TBADataModal";
import { uploadTBADataAsync } from "@/redux/adminDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface Props {
  eventCode: string;
}

export default function Controls({ eventCode }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showTBADataModal, setShowTBADataModal] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center">
      <TBADataModal
        show={showTBADataModal}
        handleClose={() => setShowTBADataModal(false)}
        handleSubmit={async (payload) => {
          await dispatch(uploadTBADataAsync({ ...payload, eventCode }));
          setShowTBADataModal(false);
        }}
      ></TBADataModal>
      <h1 className="text-center mb-3">Controls</h1>

      <Button size="lg" disabled className="d-flex mx-auto mb-3">
        Start Match Timer
      </Button>
      <Row className="">
        <Col>
          <Button variant="secondary" disabled className="mb-2 mx-1">
            Edit Scouters
          </Button>
          <Button variant="secondary" disabled className="mb-2 mx-1">
            Edit Teams
          </Button>
        </Col>
      </Row>
      <Button variant="secondary" disabled className="mb-2">
        Generate Scouter Schedule
      </Button>
    </div>
  );
}
