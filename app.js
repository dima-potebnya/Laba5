const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const {
  MONGO_DB_HOSTNAME,
  MONGO_DB_PORT,
  MONGO_DB
} = process.env

const options = {
  useUnifiedTopology: true
}

const url = 'mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}';
 
 
const learnerScheme = new Schema({name: String, average_rating: Number}, {versionKey: false});
const learner = mongoose.model("learner", learnerScheme);
 
app.use(express.static(__dirname + "/src"));
 
mongoose.connect(url, options, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

  
app.get("/api/test/learners", function(req, res){
        
    learner.find({}, function(err, learners){
 
        if(err) return console.log(err);
        res.send(learners)
    });
});
 
app.get("/api/test/learners/:id", function(req, res){
         
    const id = req.params.id;
    learner.findOne({_id: id}, function(err, learner){
          
        if(err) return console.log(err);
        res.send(learner);
    });
});
    
app.post("/api/test/learners", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const learnerName = req.body.name;
    const averageRating = req.body.average_rating;
    const learner = new learner({name: learnerName, average_rating: averageRating});
        
    learner.save(function(err){
        if(err) return console.log(err);
        res.send(learner);
    });
});
     
app.delete("/api/test/learners/:id", function(req, res){
         
    const id = req.params.id;
    learner.findByIdAndDelete(id, function(err, learner){
                
        if(err) return console.log(err);
        res.send(learner);
    });
});
    
app.put("/api/test/learners", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const learnerName = req.body.name;
    const averageRating = req.body.average_rating;
    const newlearner = {average_rating: averageRating, name: learnerName};
     
    learner.findOneAndUpdate({_id: id}, newlearner, {new: true}, function(err, learner){
        if(err) return console.log(err); 
        res.send(learner);
    });
});
