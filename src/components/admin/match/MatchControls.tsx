/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Scouter, Team, deleteTeamAsync } from "@/redux/adminDataSlice";
import { deleteScouterAsync } from "@/redux/mainDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import TeamManageModal from "@/components/admin/match/TeamManageModal";
import ScouterManageModal from "@/components/admin/match/ScouterManageModal";

interface Props {
  scouters: Scouter[];
  teams: Team[];
}

export default function Controls({ scouters, teams }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showTeamManage, setShowTeamManage] = useState(false);
  const [showScouterManage, setShowScouterManage] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center">
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
    </div>
  );
}
