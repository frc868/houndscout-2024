import { Team } from "@/lib/enums";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface Props {
  red: boolean;
  activeTeam: number;
  teams: Team[];
  handleTeamSelect: (id: number) => void;
}

//Used in MatchAddModal to specify each team in each match.
export default function TeamDropdown({
  red,
  activeTeam,
  teams,
  handleTeamSelect,
}: Props) {
  const [value, setValue] = useState("");
  return (
    <Dropdown className="mt-1">
      <Dropdown.Toggle
        variant={red ? "danger" : "primary"}
      >
        {activeTeam}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form.Control
          autoFocus
          placeholder="Filter by team number..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {teams
            .filter((team) => team.number.toString().startsWith(value))
            .map((team) => (
              <Dropdown.Item
                key={team.number}
                onMouseDown={() => handleTeamSelect(team.number)}
              >
                {team.number}: {team.name}
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
