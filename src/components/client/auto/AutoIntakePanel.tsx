/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { AutoGamePiece } from "@prisma/client";
import { Col, Row } from "react-bootstrap";

interface Props {
  alliance: Alliance;
  blueOnLeft: boolean;
  selected: AutoGamePiece | null;
  usedGamePieces: AutoGamePiece[];
  handleSelection: (selection: AutoGamePiece) => void;
}

export default function AutoIntakePanel({
  alliance,
  blueOnLeft,
  selected,
  usedGamePieces,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Intake</h1>

      <div className="position-relative">
        <img
          className="mx-auto my-2"
          alt=""
          src={
            alliance === Alliance.BLUE
              ? blueOnLeft
                ? "/assets/blue_full_left.png"
                : "/assets/blue_full_right.png"
              : blueOnLeft
              ? "/assets/red_full_right.png"
              : "/assets/red_full_left.png"
          }
          width={540}
        />
        {!usedGamePieces.includes(AutoGamePiece.CLOSE1) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CLOSE1 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "60px", left: "140px" }
                  : { top: "372px", left: "340px" }
                : blueOnLeft
                ? { top: "60px", left: "336px" }
                : { top: "372px", left: "144px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CLOSE1)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}
        {!usedGamePieces.includes(AutoGamePiece.CLOSE2) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CLOSE2 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "138px", left: "140px" }
                  : { top: "294px", left: "340px" }
                : blueOnLeft
                ? { top: "138px", left: "336px" }
                : { top: "294px", left: "144px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CLOSE2)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}

        {!usedGamePieces.includes(AutoGamePiece.CLOSE3) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CLOSE3 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "216px", left: "140px" }
                  : { top: "216px", left: "340px" }
                : blueOnLeft
                ? { top: "216px", left: "336px" }
                : { top: "216px", left: "144px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CLOSE3)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}
        {!usedGamePieces.includes(AutoGamePiece.CENTER1) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CENTER1 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "42px", left: "455px" }
                  : { top: "390px", left: "23px" }
                : blueOnLeft
                ? { top: "42px", left: "27px" }
                : { top: "390px", left: "453px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CENTER1)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}
        {!usedGamePieces.includes(AutoGamePiece.CENTER2) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CENTER2 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "129px", left: "455px" }
                  : { top: "303px", left: "23px" }
                : blueOnLeft
                ? { top: "129px", left: "27px" }
                : { top: "303px", left: "453px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CENTER2)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}
        {!usedGamePieces.includes(AutoGamePiece.CENTER3) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CENTER3 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "216px", left: "455px" }
                  : { top: "216px", left: "23px" }
                : blueOnLeft
                ? { top: "216px", left: "27px" }
                : { top: "216px", left: "453px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CENTER3)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}

        {!usedGamePieces.includes(AutoGamePiece.CENTER4) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CENTER4 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "303px", left: "455px" }
                  : { top: "129px", left: "23px" }
                : blueOnLeft
                ? { top: "303px", left: "27px" }
                : { top: "129px", left: "453px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CENTER4)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}

        {!usedGamePieces.includes(AutoGamePiece.CENTER5) && (
          <div
            className={`grow d-flex justify-content-center align-items-center rounded-4 ${
              selected === AutoGamePiece.CENTER5 && "intake-note-selected"
            }`}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              ...(alliance === Alliance.BLUE
                ? blueOnLeft
                  ? { top: "390px", left: "455px" }
                  : { top: "42px", left: "23px" }
                : blueOnLeft
                ? { top: "390px", left: "27px" }
                : { top: "42px", left: "453px" }),
            }}
            onMouseDown={() => handleSelection(AutoGamePiece.CENTER5)}
          >
            <img
              className="mx-auto my-2"
              alt=""
              src={`/assets/note.png`}
              width={45}
            />
          </div>
        )}
      </div>
      {!usedGamePieces.includes(AutoGamePiece.PRELOAD) && (
        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 my-2 ${
            selected === AutoGamePiece.PRELOAD && "intake-note-selected"
          }`}
          style={{
            width: "180px",
            height: "60px",
          }}
          onMouseDown={() => handleSelection(AutoGamePiece.PRELOAD)}
        >
          <span className="fs-3 fw-medium me-1">Preload</span>
          <img className="ms-2" alt="" src={`/assets/note.png`} width={45} />
        </div>
      )}
    </div>
  );
}
