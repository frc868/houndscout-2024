"use client";

import StartingPositionSelector from "@/components/client/prematch/StartingZoneSelector";
import { Alliance } from "@/lib/enums";
import { setAutoStartingZoneAsync } from "@/redux/scoresSlice";
import { AppDispatch, ReduxState } from "@/redux/store";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  show: boolean;
}

//All the scouter really needs to do is put the approximate starting position; everything else is handled by the lead.
export default function PrematchContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  const mainData = useSelector((state: ReduxState) => state.mainData);

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={6}>
          <StartingPositionSelector
            alliance={mainData.alliance}
            blueOnLeft={mainData.blueOnLeft}
            selected={scores.autoStartingZone}
            handleSelection={async (zone) => {
              dispatch(setAutoStartingZoneAsync({ zone }));
            }}
          />
        </Col>
        <Col md={6} className="d-flex justify-content-start">
          <div className="d-flex flex-column justify-content-center">
            <div
              className={`ms-5 px-5 py-3 rounded-4 bg-${
                mainData.station?.includes("RED") ? "danger" : "primary"
              }-subtle`}
            >
              <h1 className="text-center">
                {mainData.station?.includes("RED") ? "Red" : "Blue"}{" "}
                {mainData.station?.[mainData.station?.length - 1]}
              </h1>
              <h1 className="text-center">Team {mainData.activeTeamNumber}</h1>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
