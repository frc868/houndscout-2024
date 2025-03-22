/* eslint-disable @next/next/no-img-element */

import { LegacyRef, useEffect, useRef } from "react";

interface Props {
  active: boolean
  selected: boolean;
  top: string;
  left: string;
  handleSelection: () => void;
  handleCancel: () => void;
  className?: string;
  text: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function ReefSideButton({
  active,
  selected,
  top,
  left,
  handleSelection,
  handleCancel,
  className,
  text,
}: Props) {
  function checkForSelection(){
    if(active){
      handleSelection();
    } else if (selected){
      handleCancel();
    }
  }
// Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const buttonRef = useRef<HTMLDivElement | null>(null);

const pressedKeys = useRef(new Set<string>());
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);
    // Presses the the coral scoring side 1 button if active
    if ((pressedKeys.current.has('1')&&text=="1")||(pressedKeys.current.has('2')&&text=="2")||(pressedKeys.current.has('3')&&text=="3")||(pressedKeys.current.has('4')&&text=="4")||(pressedKeys.current.has('5')&&text=="5")||(pressedKeys.current.has('6')&&text=="6")) {
      // Check if buttonRef.current is not null
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };
    const handleKeyup = (e: KeyboardEvent) => {
        // Remove the key from the pressedKeys set when released
        pressedKeys.current.delete(e.key);
    };
    // Attach event listeners for keydown and keyup
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
});

  return (
    <div className={className || ""} style={{
      position: "absolute",
      top: top,
      left: left,
    }}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
          selected
           ? `location-area-selected border border-5 border-primary`
           : active
             ? `location-active`
             : `bg-secondary-subtle`
        }`}
        style={{ width: "40px", height: "40px" }}
        onClick={checkForSelection}
        ref={buttonRef}
      >
        <h3 className="text-center mt-2"><u>{text}</u></h3>
      </div>
    </div>
  );
}
