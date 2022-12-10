const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
const learnerScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:20,
    default: "NoName"
  },
  average_rating: {
    type: Number,
    required: true,
    min: 1,
    max:100,
    default: 70
  },
  group: {
    name: {
      type: String,
      default: "NoName"
    },
    subjects: {
      type: [String],
      default: [""]
    }, 
    date: {
      type: Date,
      default: Date.now
    }
  }
},
{
  versionKey: false
});
  

mongoose.connect('mongodb://127.0.0.1:27017/usersdb', 
    { useUnifiedTopology: true, useNewUrlParser: true });
  
const learner = mongoose.model("learners", learnerScheme);

const learner1 = new learner(); // name - NoName, average_rating - 70
const learner2 = new learner({name: "Rob"}); // name - Rob, average_rating - 70
const learner3 = new learner({average_rating: 68}); // name - NoName, average_rating - 68
const learner4 = new learner({name: "Kate", average_rating: 72});
const learnerError = new learner({name: "Ac"});
  
learner1.save()
  .then(function(doc){
	mongoose.disconnect();
    console.log("Об'єкт learner збережено ", doc);
  })
  .catch(function (err){
    mongoose.disconnect();
	console.log(err);
  });

learner2.save()
  .then(function(doc){
    mongoose.disconnect();
	console.log("Об'єкт learner збережено ", doc);
  })
  .catch(function (err){
    mongoose.disconnect();
	console.log(err);
  });

learner3.save()
  .then(function(doc){
    mongoose.disconnect();
	console.log("Об'єкт learner збережено ", doc);
  })
  .catch(function (err){
    mongoose.disconnect();
	console.log(err);
  });

learner4.save()
  .then(function(doc){
    mongoose.disconnect();
	console.log("Об'єкт learner збережено ", doc);
  })
  .catch(function (err){
    mongoose.disconnect();
	console.log(err);
  });

learnerError.save()
  .then(function(doc){
    mongoose.disconnect();
    console.log("Об'єкт learner збережено ", doc);
  })
  .catch(function (err){
    mongoose.disconnect();
    console.log(err);
  });

  learner.create({name: "Rob", average_rating: 82}, function(err, doc){
    mongoose.disconnect();
    
    if(err) return console.log(err);
    
    console.log("Збережено об'єкт learner, method create", doc);
  });
  
  learner.find({}, function(err, docs){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("learner.find ({})", docs);
  });
  
  learner.find({name: "Rob"},  function(err, docs){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("learner.find ({name: 'Rob'})", docs);
  });
  
  learner.findOne({name: "Rob"},  function(err, docs){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("learner.findOne({name: 'Rob'})", docs);
  });
  
  const id = '63867317e721023e25f8f844';

  learner.findById(id,  function(err, docs){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("learner.findById", docs);
  });

  learner.deleteMany({average_rating:70}, function(err, result){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("deleteMany", result);
  });
  
  learner.deleteOne({name:"Kate"}, function(err, result){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("deleteOne", result);
  });
  
  learner.findOneAndDelete({name:"Rob"}, function(err, result){
    mongoose.disconnect();
   
    if(err) return console.log(err);
   
    console.log("findOneAndDelete", result);
  });
  
  learner.findByIdAndDelete("63867317e721023e25f8f843", function(err, result){
    mongoose.disconnect();
    
    if(err) return console.log(err);
   
    console.log("findByIdAndDelete", result);
  });
  
  learner.updateOne({name: "Rob"}, {name: "Rob Brown"}, function(err, result){
     
    mongoose.disconnect();
    if(err) return console.log(err);
    console.log(result);
  });
  
  learner.findByIdAndUpdate("63867f5274b679f0b34c9ebe", {name: "Den", average_rating: 86}, {new: true}, function(err, user){
     
    mongoose.disconnect();
    if(err) return console.log(err);
    console.log("Об'ект оновлений, findByIdAndUpdate", user);
  });
  
  learner.findOneAndUpdate({name: "Kate"}, {name: "Bob", average_rating: 72}, {new: true}, function(err, user){
     
    mongoose.disconnect();
    if(err) return console.log(err);
    console.log("Об'ект оновлений, findOneAndUpdate", user);
  });