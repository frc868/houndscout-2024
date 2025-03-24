import { useEffect, useRef } from "react";

interface Props {
  enabled: boolean;
  handleClick: () => void;
  className?: string;
}

//Checkbox with the header on the side, for some reason.
export default function ToggleBox({
  enabled,
  handleClick,
  className,
}: Props) {
// Explicitly typing the buttonRef as pointing to an HTMLDivElement
    const buttonRef = useRef<HTMLDivElement | null>(null);
    
    const pressedKeys = useRef(new Set<string>());
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        // Add the key to the pressedKeys set
        pressedKeys.current.add(e.key);
        // Presses the the coral scoring side 1 button if active
        if (pressedKeys.current.has('m')) {
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
    <div className={`d-flex align-items-center ${className || ""}`}>
      <div
        className={`d-flex justify-content-center align-items-center rounded-4 mx-2 ${
          enabled ? "text-success bg-success-subtle" : "bg-dark-subtle"
        }`}
        style={{
          width: "60px",
          height: "60px",
          fontSize: "30pt",
        }}
        onClick={handleClick}
        ref={buttonRef}
      >
        {enabled && <i className="bi bi-check-lg" />}
      </div>
      <h3 className="mx-2"><u>M</u>obility Bonus</h3>
    </div>
  );
}
