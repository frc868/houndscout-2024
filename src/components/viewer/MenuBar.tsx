import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

interface Props {
  eventName: string;
}

export default function TopBar({ eventName }: Props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="font-monospace ms-4 fs-5">
          HoundScout Viewer
        </Navbar.Brand>
        <Navbar.Text className="justify-self-end text-end me-4 w-100 fs-6 fw-medium font-monospace">
          2024inpla
        </Navbar.Text>
      </Navbar>
      <div
        className="bg-dark text-white"
        style={{
          width: "15%",
          height: "calc(100vh - 56px)",
          overflowY: "auto",
        }}
      >
        <h1>test</h1>
      </div>
    </>
  );
}
