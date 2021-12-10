# rangers-team-service
## Introduction
This service is hooked up to a Postgres database and is designed to be an easy RESTful interface for retrieving player, team, and game information for baseball players on a given team.

## Endpoints
### Players
- /players
- /players/search
- /players/:playerId
- /players/:playerId/results
- /players/:playerId/results/averages
### Games
- /games
- /games/:gameId
### Teams
- /teams/managements
- /teams/coaches
- /teams/results
- /teams/results/averages

## Development
The server can be started, for development purposes, after `npm install`ing and then running the command `npm run start:dev`. All endpoints should be accessible on port 3000.