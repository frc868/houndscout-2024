import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ViewerTab } from "./ViewerEnums";

interface Props {
  eventCode: string;
}

//Just a small amount of info.
export default function TopBar({ eventCode }: Props) {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="position-fixed vw-100">
        <Navbar.Brand className="font-monospace ms-4 fs-5">
          HoundScout Viewer
        </Navbar.Brand>
        <Navbar.Text className="justify-self-end text-end me-4 w-100 fs-6 fw-medium font-monospace">
          Event Code: {eventCode}
        </Navbar.Text>
      </Navbar>
    </>
  );
}
