"use client";
//Just a menu page. Not much to it.
import StatusBar from "@/components/client/common/StatusBar";
import { Row, Button, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <StatusBar isConnected={true} />
      <Row className="d-flex justify-content-center flex-row">
        <Col className="d-flex justify-content-center flex-column" md={6}>
          <h1 className="text-center mt-4">Client</h1>
          <Row className="d-flex justify-content-center flex-row">
            <Col className="d-flex justify-content-center flex-column" md={6}>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="danger"
                href="/client/red1"
              >
                Red 1
              </Button>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="danger"
                href="/client/red2"
              >
                Red 2
              </Button>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="danger"
                href="/client/red3"
              >
                Red 3
              </Button>
            </Col>
            <Col className="d-flex justify-content-center flex-column" md={6}>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="primary"
                href="/client/blue1"
              >
                Blue 1
              </Button>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="primary"
                href="/client/blue2"
              >
                Blue 2
              </Button>
              <Button
                className="mt-3 mx-3"
                size="lg"
                variant="primary"
                href="/client/blue3"
              >
                Blue 3
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className="d-flex justify-content-center flex-column" md={4}>
          <h1 className="text-center mt-5">Other</h1>
          <Button
            className="mx-5 mt-2"
            size="lg"
            variant="secondary"
            href="/admin"
          >
            Lead Scouter
          </Button>
          <Button
            className="mx-5 mt-2"
            size="lg"
            variant="secondary"
            href="/pit"
          >
            Pit Scouting
          </Button>
          <Button
            className="mx-5 mt-2"
            size="lg"
            variant="secondary"
            href="/viewer"
          >
            Data Viewer
          </Button>
          {/* <Button
            className="mx-5 mt-2"
            size="lg"
            variant="secondary"
            href="/sandbox"
          >
            Sandbox Page
          </Button> */}
        </Col>
      </Row>
    </>
  );
}
