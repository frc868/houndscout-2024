import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ViewerTab } from "./ViewerEnums";

interface Props {
  eventName: string;
}

export default function TopBar({ eventName }: Props) {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="position-fixed vw-100">
        <Navbar.Brand className="font-monospace ms-4 fs-5">
          HoundScout Viewer
        </Navbar.Brand>
        <Navbar.Text className="justify-self-end text-end me-4 w-100 fs-6 fw-medium font-monospace">
          {eventName}
        </Navbar.Text>
      </Navbar>
    </>
  );
}
