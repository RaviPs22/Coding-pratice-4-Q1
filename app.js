const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const Dbpath = path.join(__dirname, "cricketTeam.db");
let dbConnect = null;
const mainF1 = async () => {
  try {
    dbConnect = await open({
      filename: Dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Your Server is Started");
    });
  } catch (e) {
    console.log(`DB Error :${e.message}`);
    process.exit(1);
  }
};
mainF1();

// Get Method

app.get("/players/", async (request, response) => {
  const qweryis = `
    SELECT 
    *
    FROM
    cricket_team;
    `;
  const mainC = await dbConnect.all(qweryis);
  response.send(mainC);
});

//Post Method
app.post("/players/", async (request, response) => {
  const bodyMain = request.body;
  const { playerName, jerseyNumber, role } = bodyMain;
  const a1 = `
    INSERT 
    INTO 
    cricket_team (player_name,jersey_number,role)
    VALUES (
        '${playerName}',
        '${jerseyNumber}',
        '${role}'
    );`;
  const postMethod = await dbConnect.run(a1);
  const boodId = postMethod.lastID;
  response.send("Player Added to Team");
});

// API-3
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const a2 = `
    SELECT 
    *
    FROM
    cricket_team
    WHERE player_id = ${playerId};
    `;
  const mainC = await dbConnect.all(a2);
  response.send(mainC);
});

// API-4
app.put("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const qwertis = `
    UPDATE
    cricket_team
    SET
    player_name = '${playerName}',
    jersey_number ='${jerseyNumber}',
    role = '${role}'
    WHERE player_id = ${playerId} ;`;
  const mainB = await dbConnect.run(qwertis);
  response.send("Player Details Updated");
});

// API-5
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const qwery = `
    DELETE 
    FROM
    cricket_team
    WHERE player_id = ${playerId};`;
  const mao = await dbConnect.run(qwery);
  response.send("Player Removed");
});

module.exports = app;
