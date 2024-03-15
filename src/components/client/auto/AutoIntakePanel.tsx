/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { AutoGamePiece } from "@prisma/client";
import { Col, Row } from "react-bootstrap";

interface Props {
  alliance: Alliance;
  blueOnLeft: boolean;
  selected: AutoGamePiece[];
  missing: AutoGamePiece[];
  handleSelection: (selection: AutoGamePiece) => void;
}

export default function AutoIntakePanel({
  alliance,
  blueOnLeft,
  selected,
  missing,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Notes Attempted</h1>

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
        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CLOSE1) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CLOSE1) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CLOSE1) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CLOSE1) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CLOSE1) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CLOSE2) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CLOSE2) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CLOSE2) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CLOSE2) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CLOSE2) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CLOSE3) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CLOSE3) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CLOSE3) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CLOSE3) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CLOSE3) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CENTER1) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CENTER1) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CENTER1) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CENTER1) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CENTER1) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CENTER2) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CENTER2) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CENTER2) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CENTER2) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CENTER2) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CENTER3) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CENTER3) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CENTER3) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CENTER3) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CENTER3) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CENTER4) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CENTER4) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CENTER4) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CENTER4) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CENTER4) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>

        <div
          className={`grow d-flex justify-content-center align-items-center rounded-4 ${
            selected.includes(AutoGamePiece.CENTER5) && "intake-note-selected"
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
          {selected.includes(AutoGamePiece.CENTER5) && (
            <div
              className={`fw-semibold fs-5 ${
                missing.includes(AutoGamePiece.CENTER5) && "text-white"
              }`}
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 3, // Ensure it floats above the image
              }}
            >
              {selected.indexOf(AutoGamePiece.CENTER5) + 1}
            </div>
          )}
          {missing.includes(AutoGamePiece.CENTER5) && (
            <div
              className="text-danger"
              style={{
                position: "absolute",
                top: "50%", // Center vertically in the parent
                left: "50%", // Center horizontally in the parent
                transform: "translate(-50%, -50%)", // Ensure centered positioning
                zIndex: 2, // Ensure it floats above the image
                fontSize: "70pt",
                WebkitTextStroke: "5px",
              }}
            >
              <i className="bi bi-x" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
