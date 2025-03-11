import { useRef, useEffect, useState } from "react";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
  gamePiece: string;
}

//Big fat fail button for when the robot fails to score.
export default function FailButton({ active, handleClick, className, gamePiece }: Props) {
  const [text,setText]=useState(gamePiece=="coral"?`Z`:`N`);
  function checkForSelection(){
    if(active){
      handleClick();
      setText("Done!");
      setTimeout(()=>{setText(gamePiece=="coral"?`Z`:`N`)},1000)
    }
  }
  // Explicitly typing the buttonRef as pointing to an HTMLButtonElement
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const pressedKeys = useRef(new Set<string>());
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Add the key to the pressedKeys set
      pressedKeys.current.add(e.key);
      // Presses the the coral scoring side 1 button if active
      if ((pressedKeys.current.has('z')&&gamePiece=="coral")||(pressedKeys.current.has('n')&&gamePiece=="algae")) {
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
      <button
        className={`text-center d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-danger-subtle border-danger text-danger"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "100px",
          height: "100px",
          fontSize: "70pt",
          WebkitTextStroke: "4px",
        }}
        onClick={checkForSelection}
        ref={buttonRef}
      >
        <i className="bi bi-x" />
      </button>
      <p className="d-flex flex-row justify-content-center"><u>{text}</u></p>
    </div>
  );
}
