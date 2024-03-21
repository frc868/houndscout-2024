"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { getActiveEventAsync } from "@/redux/mainDataSlice";
import TopBar from "@/components/viewer/TopBar";
import { ViewerTab } from "@/components/viewer/ViewerEnums";
import MenuBar from "@/components/viewer/MenuBar";
import { Col, Row } from "react-bootstrap";
import HomeContent from "@/components/viewer/content/HomeContent";
import RankingsContent from "@/components/viewer/content/RankingsContent";
import { getRankingsAsync } from "@/redux/viewerDataSlice";

export default function Viewer() {
  const viewerData = useSelector((state: ReduxState) => state.viewerData);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<ViewerTab>(ViewerTab.HOME);

  useEffect(() => {
    async function update() {
      await dispatch(getActiveEventAsync());
      await dispatch(getRankingsAsync());
    }
    update();
  }, [dispatch]);

  return (
    <>
      <div className="vw-100 vh-100 position-relative">
        <div className="vw-100 vh-100 bg-secondary position-fixed z-n1"></div>
        <TopBar eventName="2024inmis" />
        <MenuBar selectedTab={tab} handleTabSelect={setTab} />
        <Row style={{ paddingTop: "64px" }}>
          <Col className="ps-0 pe-0" md={2}></Col>

          <Col className="ps-0">
            {tab === ViewerTab.HOME && <HomeContent />}
            {tab === ViewerTab.RANKINGS && <RankingsContent />}
          </Col>
        </Row>
      </div>
      {/* {!ready && (
        <div className="vh-100 d-flex justify-content-center mt-5">
          <h1>Waiting...</h1>
        </div>
      )}
      {ready && <SectionSelector selected={tab} handleSelection={setTab} />}
      {ready && tab === Section.PREMATCH && <PrematchContent />}
      {ready && tab === Section.AUTO && <AutoContent />}
      {ready && tab === Section.TELEOP && <TeleopContent />}
      {ready && tab === Section.POSTMATCH && <PostmatchContent />} */}
    </>
  );
}
