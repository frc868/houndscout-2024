## HoundScout: Setup guide
First, ensure you're using the Workspace version of TypeScript, as this will fix multiple errors regarding certain imports. 
Then, create a PostgreSQL database. Ensure you use the database name "houndscout" and the database user "techhounds", as the export database function will not work without these. Create a .env file and enter the database URL to connect the database to your server.
Run "npx prisma migrate dev" in the terminal to create the necessary framework in the database, then do the following to finish setup:
1. Create and fill in 6 Heartbeats, one for each station.
2. Create and fill in an Event.
3. Create a row in Server and set the Event to this event.
4. Create a Team for every team in the event and fill in team number, name, and location.
5. Ensure each team is connected to the event.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3012](http://localhost:3012) with your browser to see the result.
