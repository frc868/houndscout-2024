/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { deleteTeamAsync, uploadOfflineTBADataAsync, uploadOnlineTBADataAsync } from "@/redux/adminDataSlice";
import { setBlueOnLeftAsync } from "@/redux/mainDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import TeamManageModal from "@/components/admin/TeamManageModal";
import ScouterManageModal from "@/components/admin/ScouterManageModal";
import TBADataModal from "./TBADataModal";
import { Scouter, Team } from "@/lib/enums"
import EventManageModal from "./EventManageModal";
import { Event } from "@prisma/client";

interface Props {
  scouters: Scouter[];
  allTeams: Team[];
  eventTeams: Team[];
  eventCode: string;
  blueOnLeft: boolean;
  eventList?: Event[];
}

//Many of these link to other modals, others call certain apis.
export default function Controls({ scouters, allTeams, eventTeams, eventCode, blueOnLeft, eventList }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showEventManage, setShowEventManage] = useState(false);
  const [showTeamManage, setShowTeamManage] = useState(false);
  const [showScouterManage, setShowScouterManage] = useState(false);
  const [showTBADataModal, setShowTBADataModal] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center">
      <TBADataModal
        show={showTBADataModal}
        handleClose={() => setShowTBADataModal(false)}
        handleSubmit={async (payload) => {
          await dispatch(uploadOfflineTBADataAsync({ ...payload, eventCode }));
          setShowTBADataModal(false);
        }}
        handleOnline={async () => {
          await dispatch(uploadOnlineTBADataAsync({ eventCode }));
          setShowTBADataModal(false);
        }}
      />
      <EventManageModal
        show={showEventManage}
        eventList={eventList as Event[]}
        activeEvent={eventCode as string}
        handleClose={() => setShowEventManage(false)}
      />
      <TeamManageModal
        show={showTeamManage}
        allTeams={allTeams as Team[]}
        eventTeams={eventTeams as Team[]}
        handleClose={() => setShowTeamManage(false)}
      />
      <ScouterManageModal
        show={showScouterManage}
        scouters={scouters as Scouter[]}
        handleClose={() => setShowScouterManage(false)}
      />
      <h1 className="text-center mb-3">Controls</h1>
      <Row className="">
        <Button
          // disabled
          variant="secondary"
          style={blueOnLeft?{
            backgroundImage: "linear-gradient(to right, blue , gray , red)"
          }:{
            backgroundImage: "linear-gradient(to right, red , gray , blue)"
          }}
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
        <Button variant="secondary" onClick={() => setShowEventManage(true)} className="mb-2">
          Manage Events
        </Button>
      </Row>
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
        <Button
          variant="secondary"
          className="mb-2"
          onClick={() => setShowTBADataModal(true)}
        >
          Import TBA Data
        </Button>
      </Row>
    </div>
  );
}
