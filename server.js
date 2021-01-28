
const express = require('express');
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 5000;

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sw5ft.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true,});
client.connect(err => {
    const tasks = client.db("volunteer-network").collection("tasks");
   const registrations = client.db("volunteer-network").collection("registrations");
    
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
      


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen (process.env.PORT|| port);