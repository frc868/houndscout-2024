
Prematchcontent · TSX
"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Row, Col, Button } from "react-bootstrap";
import MiniToggleBox from "../mini/MiniToggleBox";
import StartingPositionSelector from "../prematch/StartingPositionSelector";
import {
  setAutoStartingZoneAsync,
  setPreloadedAsync,
  cancelScore,
  clearEvents,
} from "@/redux/scoresSlice";
import { AutoStartingZone } from "@prisma/client";

interface Props {
  show: boolean;
}

//All the scouter really needs to do is put the approximate starting position; everything else is handled by the lead.
export default function PrematchContent({ show }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const scores = useSelector((state: ReduxState) => state.scores);
  const mainData = useSelector((state: ReduxState) => state.mainData);

  const confirmNoShow = () => {
    if (
      confirm(
        "Are you sure? Only click OK if you are unable to input match-related data for any reason, as this will cancel this score."
      ) == true
    ) {
      dispatch(cancelScore({}));
      dispatch(clearEvents({}));
    }
  };

  return (
    <div className={`${!show && "d-none"}`}>
      <Row className="my-5">
        <Col className="d-flex justify-content-end" md={6}>
          <StartingPositionSelector
            alliance={mainData.alliance}
            blueOnLeft={mainData.blueOnLeft}
            selected={scores.autoStartingZone}
            handleSelection={async (zone: AutoStartingZone) => {
              dispatch(setAutoStartingZoneAsync({ zone }));
            }}
          />
        </Col>
        <Col md={6} className="d-flex justify-content-start">
          <Row>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div
                className={`ms-5 px-5 py-3 rounded-4 bg-${
                  mainData.station?.includes("RED") ? "danger" : "primary"
                }-subtle`}
              >
                <h1 className="text-center">
                  {mainData.station?.includes("RED") ? "Red" : "Blue"}{" "}
                  {mainData.station?.[mainData.station?.length - 1]}
                </h1>
                <h1 className="text-center">
                  Team {mainData.activeTeamNumber}
                </h1>
              </div>
              <p>Remember: Only switch tabs when the buzzers sound.</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <MiniToggleBox
                className="mx-5"
                name="Fuel Preloaded?"
                enabled={scores.preloaded}
                handleClick={() =>
                  dispatch(setPreloadedAsync({ preloaded: !scores.preloaded }))
                }
              />
            </div>
            <div className="d-flex flex-column align-items-center">
              <Button
                className="submit-button fs-4 rounded-4 fw-bold"
                variant="danger"
                onClick={confirmNoShow}
              >
                Cancel Score
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}