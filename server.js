const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models/workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/api/workouts', (req, res) =>{
    db.find({},(err, data) =>{
        if (err) throw err;
        else {
            res.send(data);
        }
    });
});

app.get('/exercise', (req, res)=> {
    res.sendFile(path.join(__dirname,'./public/exercise.html'));
});

app.get('/stats', (req, res)=> {
    res.sendFile(path.join(__dirname,'./public/stats.html'));
});

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post("/api/workouts", (req, res) => {
    console.log(req.body, "inside post")
    db.create({ exercises: req.body })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
});

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body, "put")
    db.update(
        {_id: req.params.id}, { $set: { exercises: req.body, totalDuration: req.body } },
        
        (error, data) => {
            if (error) {
              console.log(error);
              res.send(error);
            } else {
              console.log(data);
              res.send(data);
            }
          }
    )
});

app.get('/api/workouts/range', (req,res) => {
    db.find({},(err, data) =>{
        if (err) throw err;
        else {
            res.send(data);
        }
    });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

