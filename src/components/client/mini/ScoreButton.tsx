import { useRef, useEffect, useState } from "react";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
  gamePiece: string;
}

//Button that indicates the robot scored!
export default function ScoreButton({ active, handleClick, className, gamePiece }: Props) {
  const [text,setText]=useState(gamePiece=="coral"?`Q`:`Y`);
    function checkForSelection(){
      if(active){
        handleClick();
        setText("Done!");
        setTimeout(()=>{setText(gamePiece=="coral"?`Q`:`Y`)},1000)
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
      if ((pressedKeys.current.has('q')&&gamePiece=="coral")||(pressedKeys.current.has('y')&&gamePiece=="algae")) {
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
    <div className={className || ""}>
      <div
        className={`text-center d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-success-subtle border-success text-success"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "100px",
          height: "100px",
          fontSize: "90pt",
        }}
        onClick={checkForSelection}
        ref={buttonRef}
      >
        <i className="bi bi-check" />
      </div>
      <p className="d-flex flex-row justify-content-center"><u>{text}</u></p>
    </div>
  );
}
