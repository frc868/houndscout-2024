import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

interface Props {
  scouterName?: string;
  team?: number;
  matchName?: string;
  isConnected: boolean;
}

export default function StatusBar({
  scouterName,
  team,
  matchName,
  isConnected,
}: Props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Text className="justify-content-start ms-4 w-50">
        {scouterName && team && matchName ? (
          <div>
            Logged in as: <strong>{scouterName}</strong> | Scouting:{" "}
            <strong>{team}</strong> |{" "}
            {matchName?.replace("qm", "Qualification Match ")}
          </div>
        ) : (
          <div>Waiting for update...</div>
        )}
      </Navbar.Text>

      <Navbar.Brand className="font-monospace">HoundScout v2024.0</Navbar.Brand>
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
