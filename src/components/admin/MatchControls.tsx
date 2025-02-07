/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { deleteTeamAsync, uploadTBADataAsync } from "@/redux/adminDataSlice";
import { setBlueOnLeftAsync } from "@/redux/mainDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import TeamManageModal from "@/components/admin/TeamManageModal";
import ScouterManageModal from "@/components/admin/ScouterManageModal";
import TBADataModal from "./TBADataModal";
import { Scouter, Team } from "@/lib/enums"

interface Props {
  scouters: Scouter[];
  allTeams: Team[];
  eventTeams: Team[];
  eventCode: string;
  blueOnLeft: boolean;
}

//Many of these link to other modals, others call certain apis.
export default function Controls({ scouters, allTeams, eventTeams, eventCode, blueOnLeft }: Props) {
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
        allTeams={allTeams as Team[]}
        eventTeams={eventTeams as Team[]}
        handleClose={() => setShowTeamManage(false)}
      ></TeamManageModal>
      <ScouterManageModal
        show={showScouterManage}
        scouters={scouters as Scouter[]}
        handleClose={() => setShowScouterManage(false)}
      ></ScouterManageModal>
      <h1 className="text-center mb-3">Controls</h1>
      <Row className="">
        <Button variant="secondary" onClick={() => setShowScouterManage(true)} className="mb-2">
          Manage Scouters
        </Button>
      </Row>
      <Row className="">
        <Button variant="secondary" onClick={() => setShowTeamManage(true)} className="mb-2">
          Manage Teams
        </Button>
      </Row>
      <Row className="">
        <Button variant="secondary" disabled className="mb-2">
          Generate Scouter Schedule
        </Button>
      </Row>
      <Row className="">
        <Button
          // disabled
          variant="secondary"
          className="mb-2"
          onClick={async (payload) => {
            await dispatch(
              setBlueOnLeftAsync({
                blueOnLeft: !blueOnLeft,
            }));
          }}
        >
          Toggle Orientation <br />(Currently: {blueOnLeft?"Blue on Left":"Blue on Right"})
        </Button>
      </Row>
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
      
      <Row className="">
        <Col>
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
        </Col>
      </Row>
      <Row className="">
        <Col>
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
        </Col>
      </Row>
      
      
    </div>
  );
}
