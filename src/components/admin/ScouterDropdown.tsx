import { Scouter } from "@/lib/enums";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface Props {
  active: boolean;
  activeScouter: Scouter;
  scouters: Scouter[];
  handleScouterSelect: (id: number) => void;
}

//Dropdown used in MatchSchedule to specify the scouter in each.
export default function ScoutersDropdown({
  active,
  activeScouter,
  scouters,
  handleScouterSelect,
}: Props) {
  const [value, setValue] = useState("");
  return (
    <Dropdown className="mt-1" style={{ width: '100%' }}>
      <Dropdown.Toggle
        variant={active ? "secondary" : "outline-secondary"}
        size="sm"
      >
        {activeScouter?activeScouter.name+(!activeScouter.active?" (Inactive)":""):"Unassigned"}
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
            .sort((a, b)=>{return (a.active === b.active) ? 0 : a.active ? -1 : 1;})
            .map((scouter) => (
              <Dropdown.Item
                key={scouter.id}
                onMouseDown={() => handleScouterSelect(scouter.id)}
              >
                {scouter.name} {!scouter.active?"(Inactive)":""}
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
