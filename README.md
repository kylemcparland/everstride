# EVERSTRIDE

1. Install NEXT.JS 13
2. npm install pg dotenv
3. startpostgres (every time on computer restart)
4. create "everstride" db in psql with "create database everstride"

One time on project init:
Initialize .env.local for DB access info
Initialize db.js file to create new pool to make psql queries to

Workflow for db usage:
1. Import db variable (from db/connection.js) into "api/[NAME OF ROUTE]/route.js" (ex: api/users/route.js) to setup db api.
2. Create or use existing helper function inside helpers/api to fetch.
3. Import helper function into component you wish to make db queries (will need to be client side to pull from a form to make queries).

If page isn't changing even after modifying, you may need to delete the ".next" folder at the top of the directory, which stores all cache.