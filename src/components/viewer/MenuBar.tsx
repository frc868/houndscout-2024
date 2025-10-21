import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ViewerTab } from "@/lib/enums";

interface Props {
  selectedTab: ViewerTab;
  handleTabSelect: (tab: ViewerTab) => void;
}

//The side bar with the tab selctor.
export default function MenuBar({ selectedTab, handleTabSelect }: Props) {
  return (
    <>
      <div
        className="bg-dark text-white d-flex flex-column ps-2 position-fixed"
        style={{
          width: "15%",
          height: "calc(100vh - 56px)",
          overflowY: "auto",
          marginTop: "56px",
        }}
      >
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.RANKINGS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.RANKINGS)}
        >
          Main Page
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.EVENTS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.EVENTS)}
        >
          Scoring Events
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.PIT && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.PIT)}
        >
          Pit Data
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.SCORES && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.SCORES)}
        >
          Team Data
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.CORALS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.CORALS)}
        >
          Coral Data
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.ALGAES && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.ALGAES)}
        >
          Algae Data
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.INCAPS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.INCAPS)}
        >
          Incap Data
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.IMPORT && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.IMPORT)}
        >
          Exp/Imp Data
        </div>
      </div>
    </>
  );
}
