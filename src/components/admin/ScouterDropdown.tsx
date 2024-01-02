import { Scouter } from "@/redux/adminDataSlice";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface Props {
  active: boolean;
  activeScouter: string;
  scouters: Scouter[];
  handleScouterSelect: (id: number) => void;
}

export default function ScoutersDropdown({
  active,
  activeScouter,
  scouters,
  handleScouterSelect,
}: Props) {
  const [value, setValue] = useState("");
  return (
    <Dropdown className="mt-1">
      <Dropdown.Toggle
        variant={active ? "secondary" : "outline-secondary"}
        size="sm"
      >
        {activeScouter}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {scouters
            .filter((scouter) => scouter.name.toLowerCase().startsWith(value))
            .map((scouter) => (
              <Dropdown.Item
                key={scouter.id}
                onMouseDown={() => handleScouterSelect(scouter.id)}
              >
                {scouter.name}
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
