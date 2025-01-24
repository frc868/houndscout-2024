/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { deleteTeamAsync, uploadTBADataAsync } from "@/redux/adminDataSlice";
// import { deleteScouterAsync } from "@/redux/mainDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import TeamManageModal from "@/components/admin/match/TeamManageModal";
import ScouterManageModal from "@/components/admin/match/ScouterManageModal";
import TBADataModal from "../data/TBADataModal";
import { Scouter, Team } from "@/lib/enums"

interface Props {
  scouters: Scouter[];
  teams: Team[];
  eventCode: string;
}

//Many of these link to other modals, others call certain apis.
export default function Controls({ scouters, teams, eventCode }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showTeamManage, setShowTeamManage] = useState(false);
  const [showScouterManage, setShowScouterManage] = useState(false);
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
      <TeamManageModal
        show={showTeamManage}
        teams={teams as Team[]}
        handleClose={() => setShowTeamManage(false)}
      ></TeamManageModal>
      <ScouterManageModal
        show={showScouterManage}
        scouters={scouters as Scouter[]}
        handleClose={() => setShowScouterManage(false)}
      ></ScouterManageModal>
      <h1 className="text-center mb-3">Controls</h1>
      <Button size="lg" disabled className="d-flex mx-auto mb-3">
        Start Match Timer
      </Button>
      <Row className="">
        <Col>
          <Button variant="secondary" onClick={() => setShowScouterManage(true)} className="mb-2 mx-1">
            Edit Scouters
          </Button>
          <Button variant="secondary" onClick={() => setShowTeamManage(true)} className="mb-2 mx-1">
            Edit Teams
          </Button>
        </Col>
      </Row>
      <Button variant="secondary" disabled className="mb-2">
        Generate Scouter Schedule
      </Button>
      <Row className="">
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
        href={`/api/v1/export`}
        className="mb-2 mx-1"
      >
        Postgres Dump
      </Button>
      <Button
        variant="secondary"
        href={`/api/v1/events/${eventCode}/statistics/all/csv`}
        className="mb-2 mx-1"
      >
        CSV
      </Button>
      <Button
        variant="secondary"
        href={`/api/v1/events/${eventCode}/statistics/all`}
        className="mb-2 mx-1"
        target="_blank"
      >
        JSON
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
