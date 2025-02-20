/* eslint-disable @next/next/no-img-element */

import { LegacyRef } from "react";

interface Props {
  active: boolean
  selected: boolean;
  top: string;
  left: string;
  handleSelection: () => void;
  className?: string;
  text: string;
  ref: LegacyRef<HTMLDivElement>;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function ReefSideButton({
  active,
  selected,
  top,
  left,
  handleSelection,
  className,
  text,
  ref,
}: Props) {
  function checkForSelection(){
    if(active){
      handleSelection();
    }
  }
  return (
    <div className={className || ""} style={{
      position: "absolute",
      top: top,
      left: left,
    }}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center border border-5 rounded-4 ${
          selected
           ? `location-area-selected border-primary`
           : active
             ? `location-active border-secondary`
             : `bg-secondary-subtle border-secondary`
        }`}
        style={{ width: "40px", height: "40px" }}
        onMouseDown={checkForSelection}
        ref={ref}
      >
        <h3 className="text-center mt-2">{text}</h3>
      </div>
    </div>
  );
}
