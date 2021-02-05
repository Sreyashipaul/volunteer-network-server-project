
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri =
  "mongodb+srv://9t6:livelovedie@cluster0.dupvj.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 5000;

client.connect((err) => {
  const tasks = client.db("volunteer-network").collection("tasks");

  const registrations = client
    .db("volunteer-network")
    .collection("registrations");

  app.get("/tasks", (req, res) => {
    tasks.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.post("/addRegistration", (req, res) => {
    const activity = req.body;
    registrations.insertOne(activity).then((result) => {
      res.send(result);
      console.log(result);
    });
  });

  app.get("/activities", (req, res) => {
    const activity = req.body;
    activities.find({ email: req.query.email }).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port);