import { Section } from "@prisma/client";
import { Button } from "react-bootstrap";
import { useEffect, useRef } from "react";

interface Props {
  selected: Section;
  handleSelection: (selection: Section) => void;
}

//The tab selector that lets you switch between different parts of the client page.
export default function SectionSelector({ selected, handleSelection }: Props) {
// Explicitly typing the buttonRef as pointing to an HTMLButtonElement
const prematchTabRef = useRef<HTMLButtonElement | null>(null);
const autoTabRef = useRef<HTMLButtonElement | null>(null);
const teleopTabRef = useRef<HTMLButtonElement | null>(null);
const postmatchTabRef = useRef<HTMLButtonElement | null>(null);

const pressedKeys = useRef(new Set<string>());
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Add the key to the pressedKeys set
    pressedKeys.current.add(e.key);
    // Shifts tab to the next entry if possible
    if (pressedKeys.current.has('Tab')) {
      // Check if buttonRef.current is not null
      if (selected==Section.PREMATCH){
        if (autoTabRef.current) {
          autoTabRef.current.click();
        }
      } else if (selected==Section.AUTO){
        if (teleopTabRef.current) {
          teleopTabRef.current.click();
        }
      } else if (selected==Section.TELEOP){
        if (postmatchTabRef.current) {
          postmatchTabRef.current.click();
        }
      } else if (selected==Section.POSTMATCH){
        if (prematchTabRef.current) {
          prematchTabRef.current.click();
        }
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
    <> 
      <h6 className="d-flex flex-row justify-content-center mt-1">Press <u className="mx-1">Tab</u> to switch to next tab.</h6>
      <div className="d-flex justify-content-evenly mx-5 py-2">
        <Button
          key="PREMATCH"
          variant="secondary"
          className={`state-button fs-4 rounded-4 fw-bold ${
            selected === Section.PREMATCH && `prematch-button`
          }`}
          ref={prematchTabRef}
          onClick={() => handleSelection(Section.PREMATCH)}
        >
          PREMATCH
        </Button>
        <Button
          key="AUTO"
          variant="secondary"
          className={`state-button fs-4 rounded-4 fw-bold ${
            selected === Section.AUTO && `auto-button`
          }`}
          ref={autoTabRef}
          onClick={() => handleSelection(Section.AUTO)}
        >
          AUTO
        </Button>
        <Button
          key="TELEOP"
          variant="secondary"
          className={`state-button fs-4 rounded-4 fw-bold ${
            selected === Section.TELEOP && `teleop-button`
          }`}
          ref={teleopTabRef}
          onClick={() => handleSelection(Section.TELEOP)}
        >
          TELEOP
        </Button>
        <Button
          key="POSTMATCH"
          variant="secondary"
          className={`state-button fs-4 rounded-4 fw-bold ${
            selected === Section.POSTMATCH && `postmatch-button`
          }`}
          ref={postmatchTabRef}
          onClick={() => handleSelection(Section.POSTMATCH)}
        >
          POSTMATCH
        </Button>
      </div>
      {(selected == Section.AUTO || selected == Section.TELEOP) && (
        <>
          <h6 className="d-flex flex-row justify-content-center mt-1"><u>S</u>: Undo Coral input</h6>
          <h6 className="d-flex flex-row justify-content-center mt-1"><u>G</u>: Undo Algae input</h6>
        </>
      )}
    </>
  );
}
