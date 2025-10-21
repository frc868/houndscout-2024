import { Row, Col, Button } from "react-bootstrap";
import PitImportForm from "../PitImportForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { uploadPitDataOfflineAsync, uploadPitDataOnlineAsync } from "@/redux/viewerDataSlice";

interface Props {
  eventCode: string;
}
export default function ImportContent({eventCode}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showPitImport, setShowPitImport] = useState(false);

  return (
    <div
      style={{
        height: "calc(100% - 2*24px)",
        width: "calc(100% - 2*24px)",
        color: "white",
      }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Import and Export Data (WIP)</h1>
      {/* There's a pg dump function in admin, we just have to get it over here. */}
      <h3 className="text-center mb-3">Import:</h3>
        <Button
          variant="success"
          className="edit-button w-100 mx-auto mb-3"
          onClick={async () => {
            await dispatch(
              uploadPitDataOnlineAsync({
                eventCode: eventCode,
              })
            );
          }}
        >
          Import Pit Data from houndscout.techhounds.com (This event code)
        </Button>
        <Button
          variant={showPitImport?"danger":"primary"}
          className="edit-button w-100 mx-auto mb-3"
          onClick={() => setShowPitImport(!showPitImport)}
        >
          {showPitImport?"Cancel":"Import Pit Data (Offline)"}
        </Button>
        {showPitImport&&(
          <PitImportForm
            handleSubmit={
              async (payload) => {
                await dispatch(
                  uploadPitDataOfflineAsync({
                    eventCode: eventCode,
                    ...payload,
                  })
                );
                setShowPitImport(false);
              }
            }
          />
        )}
      <p>From pg_dump</p>
      <h3 className="text-center mb-3">Export:</h3>
      <Row className="">
        <Button
          variant="secondary"
          href={`/api/v1/export`}
          className="mb-2 mx-1"
        >
          pg_dump
        </Button>
        <Col>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/all`}
            className="mb-2 mx-1"
            target="_blank"
          >
            Team Scores (JSON)
          </Button>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/all/csv`}
            className="mb-2 mx-1"
          >
            Team Scores (CSV)
          </Button>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/rankings`}
            className="mb-2 mx-1"
            target="_blank"
          >
            Aggregate (JSON)
          </Button>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/rankings/csv`}
            className="mb-2 mx-1"
            target="_blank"
            disabled
          >
            Aggregate (CSV, WIP)
          </Button>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/pit`}
            className="mb-2 mx-1"
          >
            Pit Data (JSON)
          </Button>
          <Button
            variant="secondary"
            href={`/api/v1/events/${eventCode}/statistics/pit/csv`}
            className="mb-2 mx-1"
          >
            Pit Data (CSV)
          </Button>
        </Col>
      </Row>
      
    </div>
  );
}
