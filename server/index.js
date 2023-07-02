const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query(
      "CREATE TABLE IF NOT EXISTS values (id SERIAL PRIMARY KEY, number INT)"
    )
    .catch((err) => console.log("PG ERROR", err));
});

// App endpoints
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values);
});

app.post("/values", async (req, res) => {
  if (!req.body.value) res.send({ working: false });
  pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);
  res.send({ working: true });
});

app.delete("/values/:id", async (req, res) => {
  const id = req.params.id;
  await pgClient.query("DELETE FROM values WHERE id = $1", [id]);
  res.send({ success: true });
});

app.put("/values/:id", async (req, res) => {
  const id = req.params.id;
  const newValue = req.body.value;
  await pgClient.query("UPDATE values SET number = $1 WHERE id = $2", [
    newValue,
    id,
  ]);
  res.send({ success: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});
