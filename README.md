# HoundScout: Setup guide
## PCs (WIP)
First, ensure you're using the Workspace version of TypeScript, as this will fix multiple errors regarding certain imports. 

Then, create a PostgreSQL database. Ensure you the database name, username, and password are all "postgres", as the export database function will not work without these. (These specific values were also chosen for consistency with the API call for The Blue Alliance.)
# Codespaces
Create a codespace off of your branch. GitHub should handle the rest of the setup.
Please note that usage of Codespaces is limited by GitHub.
# Finish Setup
1. Create a .env file and enter the following to connect the database to your server:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
2. Run "npm install" in the terminal to install all necessary frameworks.
3. Run "npx prisma migrate dev" in the terminal to create the database. Any name will do.
3. Run "npx prisma studio" to open Prisma Studio.
4. Create a row in Server.
5. Create and fill in 6 Heartbeats, each set to a different station. Connect each of these to the Server you created.
6. Create an Event, enter something in the "code" column, and connect it to the Server.
7. Create a Team, enter something in the "number" column, and connect it to the Event.
9. Use the Command Palette to rebuild the database.

Finally, run the development server:

```bash
npm run dev
```

Ctrl+Click on (http://localhost:3012) in the terminal to open HoundScout.

Please note that the Client pages will be nonfunctional until a match is created and set as the active match via the lead scouter page.

# To be completed:
## Priority
Client: Update all interfaces to match Reefscape.
Scoring Events: Add timestamp support.
Viewer: Complete data viewer page.
Admin: Add function that aren't the scouter schedule, including a button to switch orientation.
Pit: Add this page.
## Secondary
Admin: Add algorithm to generate scouter schedule.
Comments: Improve comments.
Client: Implement key listener.