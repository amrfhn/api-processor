const express = require("express");
const Datastore = require("nedb");
// const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api/rsvp", (request, response) => {
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
  response.json(data);
});

// const express = require("express");
// const Datastore = require("nedb");
// // const fetch = require("node-fetch");

// const app = express();
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening at ${port}`));
// app.use(express.static("public"));
// app.use(express.json({ limit: "1mb" }));

// const database = new Datastore("database.db");
// database.loadDatabase();

// app.get("/api/rsvp", (request, response) => {
//   database.find({}, (err, data) => {
//     if (err) {
//       response.end();
//       return;
//     }
//     response.json(data);
//   });
// });

// app.post("/api/rsvp", (request, response) => {
//   const data = request.body;
//   const timestamp = Date.now();
//   data.timestamp = timestamp;
//   database.insert(data);
//   response.json({
//     status: "success",
//     name: data.Name,
//     timestamp: timestamp,
//   });
//   console.log(data);
// });
