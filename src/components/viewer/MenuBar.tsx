import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ViewerTab } from "./ViewerEnums";

interface Props {
  selectedTab: ViewerTab;
  handleTabSelect: (tab: ViewerTab) => void;
}

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
            selectedTab === ViewerTab.HOME && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.HOME)}
        >
          Home
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.TEAM && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.TEAM)}
        >
          Team
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.RANKINGS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.RANKINGS)}
        >
          Rankings
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.COMPARE && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.COMPARE)}
        >
          Compare
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.AUTOS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.AUTOS)}
        >
          Autos
        </div>
        <div
          className={`fs-5 py-2 mb-auto ps-4 font-monospace ${
            selectedTab === ViewerTab.PICKLIST && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.PICKLIST)}
        >
          Picklist
        </div>
        <div
          className={`fs-5 py-2 ps-4 font-monospace ${
            selectedTab === ViewerTab.IMPORT && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.IMPORT)}
        >
          Import
        </div>
        <div
          className={`fs-5 py-2 mb-4 ps-4 font-monospace ${
            selectedTab === ViewerTab.SETTINGS && "bg-secondary"
          }`}
          onClick={() => handleTabSelect(ViewerTab.SETTINGS)}
        >
          Settings
        </div>
      </div>
    </>
  );
}
