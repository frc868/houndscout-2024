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
//I moved a couple functions here, but for documentation see the MatchControls page.
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

      <Row className="">
        <Button size="lg" href="/api/v1/export" className="text-center mx-auto mb-3">
          Export Database
        </Button>
        <Button
          variant="secondary"
          className="mb-2"
          onClick={() => setShowTBADataModal(true)}
        >
          Import TBA Data
        </Button>
      </Row>
      <h3 className="text-center mb-3">Export:</h3>
      <Button
        variant="secondary"
        href={`/api/v1/events/${eventCode}/statistics/all/csv`}
        className="mb-2 mx-1"
      >
        Full CSV
      </Button>
      <Button
        variant="secondary"
        href={`/api/v1/events/${eventCode}/statistics/all`}
        className="mb-2 mx-1"
        target="_blank"
      >
        Full JSON
      </Button>
      <Button
        variant="secondary"
        href={`/api/v1/events/${eventCode}/statistics/rankings`}
        className="mb-2 mx-1"
        target="_blank"
      >
        Aggregate JSON
      </Button>
    </div>
  );
}
