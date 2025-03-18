/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

interface Props {
  active: boolean;
  handleClick?: () => void;
  className?: string;
}

//Incap button, currently unused.
export default function IncapButton({ active, handleClick, className }: Props) {
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
        onClick={handleClick}
        ref={buttonRef}
      >
        {!active ? "Start" : "End"} <u>I</u>ncap
      </Button>
    </div>
  );
}
