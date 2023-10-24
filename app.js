const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const Dbpath = path.join(__dirname, "cricketTeam.db");
const dbConnect = null;
const mainF1 = async () => {
  try {
    dbConnect = await open({
      filename: Dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3003, () => {
      console.log("Your Server is Started");
    });
  } catch (e) {
    console.log(`DB Error :${e.message}`);
    process.exit(1);
  }
};
mainF1();
app.get("/players/", async (request, response) => {
  const qweryis = `
    SELECT 
    *
    FROM
    cricket_team
    `;
  const mainC = await dbConnect.all(qweryis);
  response.send(mainC);
});
