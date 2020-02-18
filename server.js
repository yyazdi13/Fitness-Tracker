const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/api/workouts', (req, res) =>{
    db.Fitness.find({},(err, data) =>{
        if (err) throw err;
        else {
            res.send(data);
        }
    });
});

app.get('/exercise', (req, res)=> {
    db.create({ name: "Ernest Hemingway" })
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
  });
    res.sendFile(path.join(__dirname,'./public/exercise.html'));
});

app.post('/api/workouts', (req, res) => {
    db.insert(req.body, (err, data) => {
        if(err) throw err;
        else {
            res.send(data)
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

