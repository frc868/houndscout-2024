import { useRef, useEffect } from "react";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
  gamePiece: string;
}

//Big fat fail button for when the robot fails to score.
export default function FailButton({ active, handleClick, className, gamePiece }: Props) {
  function checkForSelection(){
    if(active){
      handleClick();
    }
  }
  // Explicitly typing the buttonRef as pointing to an HTMLButtonElement
    const buttonRef = useRef<HTMLDivElement | null>(null);
    
    const pressedKeys = useRef(new Set<string>());
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        e.preventDefault();
        // Add the key to the pressedKeys set
        pressedKeys.current.add(e.key);
        // Presses the the coral scoring side 1 button if active
        if ((pressedKeys.current.has('Z')&&gamePiece=="coral")||(pressedKeys.current.has('N')&&gamePiece=="algae")) {
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
        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
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
        onMouseDown={checkForSelection}
      >
        <i className="bi bi-x" />
      </div>
      <p className="d-flex flex-row justify-content-center"><u>{gamePiece=="coral"?`Z`:`N`}</u></p>
    </div>
  );
}
