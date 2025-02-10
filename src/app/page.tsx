"use client";
//Just a menu page. Not much to it.
import StatusBar from "@/components/client/common/StatusBar";
import { Row, Button, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <StatusBar isConnected={true} />
      <Row className="d-flex justify-content-center flex-row align-items-end">
        <Col className="d-flex justify-content-start flex-column align-items-end">
          <h1 className="text-center mt-3">Red Alliance</h1>
          <Button
            className="mt-3"
            size="lg"
            variant="danger"
            href="/client/red1"
          >
            Red 1
          </Button>
          <Button
            className="mt-3"
            size="lg"
            variant="danger"
            href="/client/red2"
          >
            Red 2
          </Button>
          <Button
            className="mt-3"
            size="lg"
            variant="danger"
            href="/client/red3"
          >
            Red 3
          </Button>
        </Col>
        <Col className="d-flex justify-content-center flex-column align-items-start">
          <h1 className="text-center mt-3">Blue Alliance</h1>
          <Button
            className="mt-3"
            size="lg"
            variant="primary"
            href="/client/blue1"
          >
            Blue 1
          </Button>
          <Button
            className="mt-3"
            size="lg"
            variant="primary"
            href="/client/blue2"
          >
            Blue 2
          </Button>
          <Button
            className="mt-3"
            size="lg"
            variant="primary"
            href="/client/blue3"
          >
            Blue 3
          </Button>
        </Col>
        
        <Col className="d-flex justify-content-center flex-column align-items-center">
          <h1 className="text-center mt-4">Other</h1>
          <Button
            className="mx-1 mt-2"
            size="lg"
            variant="secondary"
            href="/admin"
          >
            Lead Scouter
          </Button>
          <Button
            className="mx-1 mt-2"
            size="lg"
            variant="secondary"
            href="/pit"
          >
            Pit Scouting (WIP)
          </Button>
          <Button
            className="mx-1 mt-2"
            size="lg"
            variant="secondary"
            href="/viewer"
          >
            Data Viewer (WIP)
          </Button>
          <Button
            className="mx-1 mt-2"
            size="lg"
            variant="secondary"
            href="/sandbox"
          >
            Sandbox Page
          </Button>
        </Col>
      </Row>
    </>
  );
}
