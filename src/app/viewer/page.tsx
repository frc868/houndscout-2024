"use client";
//I actually did not know this thing existed lol
//VERY WIP, will probably replace my data thing once finished.
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
import ImportContent from "@/components/viewer/content/ImportContent";
import AutosContent from "@/components/viewer/content/AutosContent";
import SettingsContent from "@/components/viewer/content/SettingsContent";
import { getRankingsAsync } from "@/redux/viewerDataSlice";
import { Ranking } from "@/lib/enums";

export default function Viewer() {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  const viewerData = useSelector((state: ReduxState) => state.viewerData);
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<ViewerTab>(ViewerTab.RANKINGS);

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getActiveEventAsync());
      mainData.activeEvent?.code && (
        await dispatch(getRankingsAsync({ eventCode: mainData.activeEvent?.code }))  
      );
    
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, mainData.activeEvent?.code]);

  const ready = mainData.activeEvent?.code && viewerData.rankings;

  return (
    <>
      <div className="vw-100 vh-100 position-relative">
        <div className="vw-100 vh-100 bg-secondary position-fixed z-n1"></div>
        <TopBar eventName="2024inmis" />
        
        {!ready && (
          <Row style={{ paddingTop: "64px", color: "white" }} className="ps-0 pe-0 m-4 bg-dark rounded-3 font-monospace text-center">
          <div className="vh-30 d-flex justify-content-center mt-5">
            <h1>Waiting...</h1>
          </div>
          <div className="vh-3 d-flex justify-content-center mt-5">
            <h5>If this screen persists, please consult Prisma Studio and ensure the following are true:</h5>
          </div>
          <ul className="vh-1 d-flex flex-column justify-content-center mt-3">
            <li className="vh-1 d-flex justify-content-center mt-1">1. In Server, activeEvent has been set to a created Event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">2. A Match has been created and linked to the active event.</li>
            <li className="vh-1 d-flex justify-content-center mt-1">3. A Team has been created and linked to the active event.</li>
          </ul>
          </Row>
        )}
        {ready && (
          <>
          <MenuBar selectedTab={tab} handleTabSelect={setTab} />
          <Row style={{ paddingTop: "64px" }}>
            <Col className="ps-0 pe-0" md={2}></Col>
            <Col className="ps-0">
              {tab === ViewerTab.RANKINGS && <RankingsContent rankings={viewerData.rankings as Ranking[]} />}
              {tab === ViewerTab.AUTOS && <AutosContent />}
              {tab === ViewerTab.IMPORT && <ImportContent />}
              {tab === ViewerTab.SETTINGS && <SettingsContent />}
            </Col>
          </Row>
          </>
        )}
      </div>
    </>
  );
}
