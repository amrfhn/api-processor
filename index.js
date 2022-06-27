const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api/rsvp/:type", (request, response) => {
  const type = request.params.type.split(",");
  const guestType = type[0];
  const isAttending = type[1];
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api/rsvp", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json({
    status: "success",
    name: data.Name,
    timestamp: timestamp,
  });
  console.log(data);
});
