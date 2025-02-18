# HoundScout: Setup guide
## PCs (WIP)
First, ensure you're using the Workspace version of TypeScript, as this will fix multiple errors regarding certain imports. 

Then, create a PostgreSQL database. 
Use the following format for your .env file:
DATABASE_URL="postgresql://[user[:password]@][netloc][:port][/dbname]"
DBNAME="[dbname]"
DBUSER="[user]"

# Codespaces
Create a codespace off of your branch. Please note that usage of Codespaces is limited by GitHub.
Enter the following into your .env file: 
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
DBNAME="postgres"
DBUSER="postgres"
# Finish Setup
1. Create/log in to an account on The Blue Alliance, generate a Read API key, and authorize it. Add it to your .env file using the following format:
TBA_API_KEY="[key]"
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
Fix TBA functions
Addd import functions and fix pg_dump export

## Secondary
Improve comments.
Implement key listener in client page.