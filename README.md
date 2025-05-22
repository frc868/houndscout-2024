# HoundScout: The TechHOUNDS Scouting System
*v2025 for Reefscape*

This is a NextJS app that TechHOUNDS uses to gather and view information about the teams at our competitions. This data is then used to improve the quality of our decisions when building alliances for the playoffs. 

For setup instructions and more information on using and maintaining HoundScout, please view [this instructions manual](https://docs.google.com/document/d/1KYUsfgq6psxzkHbBX7BCyg7PUKJSjneX/edit?usp=sharing&ouid=111020236774408805091&rtpof=true&sd=true).

To start HoundScout, open a terminal and run the development server:

```bash
npm run dev
```

Ctrl+Click on (http://localhost:3012) in the terminal to view the results.

# Credits:
David R (App framework, Crescendo version)

Timothy M (Reefscape version programming, Data viewer, Manual, Most comments)

Aurora C (Codespace integration, Suggestions, Quality assurance)

Swayam P, Sage R, and Mr. Ford (Suggestions, Quality assurance)

Isabelle I (Reefscape version design and images)

Michael K (Pit scouting)

Mr. Potts (Keyboard input framework)

Everyone that scouted at our last competition (quality assurance)

# Update Log (v2025):
## v2025.1
This update addresses many issues with usage of HoundScout at the last competition.
* Lead Scouter:
  * Added indicators in Lead Scouter page for submitted and cancelled scores (sections in activity panel and match schedule turn green and red, respectively). The teams and scouters for submitted and cancelled scores can no longer be changed via the Lead Scouter page.
  * Revamped Scouter schedule generator. It now copies the scouters in the selected match to all future matches, aside from any submitted and cancelled scores.
  * Practice matches can now be manually created, and are placed at the beginning of the match schedule.
  * Can now import TBA data directly. No more using the annoying copy and paste method!
  * Now displays alerts if a form is incomplete.
  * Fixed event deletion not working if matches were created.
* Client:
  * Submitted/cancelled scores are now determined directly from the database, so scores that were previously submitted/cancelles can not be accessed.
  * When loading an unsubmitted score in a Client page, now erases its preexisting scoring events and incap segments to prevent false data from being submitted.
  * Added a cancel score button to the prematch tab in case a score is unable to be recorded. This will mark that score as cancelled.
  * Dropped game pieces are now its own panel, due to hitbox issues with the rest of the scoring buttons.
  * Added keyboard shortcuts for incap, dropped, and mobility buttons.
  * It is now possible to either click on the last selected intake or scoring button for a game piece or use a game piece-specific keyboard shortcut to undo it, though this will not reset the timestamps.
* Pit Scouting:
  * Adjusted some parts of the layout.
  * Now tracks if robot can intake coral and algae from lollipops (the preset piece structures on the ground)
* Data Viewer:
  * Added color coding logic for most table cells (the more blue a cell is, the better the recorded value is)
  * Changed the way comments are rendered to hopefully make them easier to read.
  * Added functions to import pit scouting data, both online and offline.
  * Picklist columns are now right after the team numbers, to make them easier to access.
