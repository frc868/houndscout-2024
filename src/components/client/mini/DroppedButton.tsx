/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface Props {
  active: boolean;
  handleSelection: () => void;
  className?: string;
  gamePiece: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function DroppedButton({
  active,
  handleSelection,
  className,
  gamePiece,
}: Props) {
  const [text,setText]=useState("Dropped");
    function checkForSelection(){
      if(active){
        handleSelection();
        setText("Done!");
        setTimeout(()=>{setText("Dropped")},1000)
      }
    }
  return (
    <div className={className || ""}>
      <div
        className={`grow d-flex justify-content-center align-items-center rounded-4 ${
          active
            ? "bg-danger-subtle border-danger border border-5 text-danger"
            : "bg-secondary-subtle text-secondary"
        }`}
        style={{ width: "75px", height: "75px", fontSize: "70pt", WebkitTextStroke: "4px", }}
        onMouseDown={checkForSelection}
      >
        <i className="bi bi-x mt-1" />
      </div>
      <p className="text-center">{text}</p>
    </div>
  );
}
