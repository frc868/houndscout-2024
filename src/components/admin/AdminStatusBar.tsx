import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

interface Props {
  matchName?: string;
  eventCode?: string;
  isConnected: boolean;
}

export default function AdminStatusBar({
  matchName,
  eventCode,
  isConnected,
}: Props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Text className="justify-content-start ms-4 w-50">
        {eventCode ? (
          <div>
            Logged in as: <strong>Lead Scouter</strong> | Event:{" "}
            <strong>{eventCode}</strong>
            {matchName &&
              ` | ${matchName?.replace("qm", "Qualification Match ")}`}
          </div>
        ) : (
          <div>Waiting for update...</div>
        )}
      </Navbar.Text>

      <Navbar.Brand>HoundScout v2024.0</Navbar.Brand>
      <Navbar.Text className="justify-self-end text-end me-4 w-50">
        {isConnected ? (
          <>
            <i className="bi bi-circle-fill text-success"></i> Connected
          </>
        ) : (
          <>
            <i className="bi bi-circle-fill text-danger"></i> Disconnected
          </>
        )}
      </Navbar.Text>
    </Navbar>
  );
}
