/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { handleIncap } from "@/redux/scoresSlice";

interface Props {
  active: boolean;
  // handleClick?: () => void;
  className?: string;
}

//Incap button component, used in teleop and auton tabs.
export default function IncapButton({ active, className }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mainData = useSelector((state: ReduxState) => state.mainData);
  // Explicitly typing the buttonRef as pointing to an HTMLButtonElement
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const pressedKeys = useRef(new Set<string>());
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Add the key to the pressedKeys set
      pressedKeys.current.add(e.key);
      // Presses the the coral scoring side 1 button if active
      if (e.key=='i') {
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
    <div className={`d-flex justify-content-center ${className || ""}`}>
      <Button
        className="secondary-button fs-5 rounded-4 fw-bold"
        variant="danger"
        onClick={()=>{dispatch(
          handleIncap()
        )}}
        ref={buttonRef}
      >
        {!active ? "Start" : "End"} <u>I</u>ncap
      </Button>
    </div>
  );
}
