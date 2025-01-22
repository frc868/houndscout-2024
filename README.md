## HoundScout: Setup guide for PCs (WIP)
First, ensure you're using the Workspace version of TypeScript, as this will fix multiple errors regarding certain imports. 

Then, create a PostgreSQL database. Ensure you the database name, username, and password are all "postgres", as the export database function will not work without these. (These specific values were also chosen for consistency with the API call for The Blue Alliance.)

## HoundScout: Setup guide for Codespaces
Create a codespace off of your branch. GitHub should handle the rest.

## HoundScout: Finish Setup
1. Create a .env file and enter the following to connect the database to your server:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
2. Run "npx prisma migrate dev" in the terminal to create the necessary framework in the database. 
3. Create and fill in 6 Heartbeats, one for each station.
4. Create and fill in an Event.
5. Create a row in Server and set the Event to this event.
6. Create a Team for every team in the event and fill in team number, name, and location.
7. Ensure each team is connected to the event.

Finally, run the development server:

```bash
npm run dev
```

Ctrl+Click on (http://localhost:3012) in the terminal to open HoundScout.
