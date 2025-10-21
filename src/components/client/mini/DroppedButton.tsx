/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";

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
  gamePiece
}: Props) {
  const [text,setText]=useState(gamePiece=="coral"?`D`:`F`);
    function checkForSelection(){
      if(active){
        handleSelection();
        setText("Done!");
        setTimeout(()=>{setText(gamePiece=="coral"?`D`:`F`)},1000)
      }
    }
  // Explicitly typing the buttonRef as pointing to an HTMLDivElement
    const buttonRef = useRef<HTMLDivElement | null>(null);
    
    const pressedKeys = useRef(new Set<string>());
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        // Add the key to the pressedKeys set
        pressedKeys.current.add(e.key);
        // Presses the the coral scoring side 1 button if active
        if ((pressedKeys.current.has('d')&&gamePiece=="coral")||(pressedKeys.current.has('f')&&gamePiece=="algae")) {
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
    <div className={`mt-3 ${className || ""}`}>
      <div
        className={`grow d-flex justify-content-center align-items-center rounded-4 ${
          active
            ? "bg-danger-subtle border-danger border border-5 text-danger"
            : "bg-secondary-subtle text-secondary"
        }`}
        style={{ width: "75px", height: "75px", fontSize: "70pt", WebkitTextStroke: "4px", }}
        onClick={checkForSelection}
        ref={buttonRef}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={85} />
      </div>
      <p className="text-center"><u>{text}</u></p>
    </div>
  );
}
