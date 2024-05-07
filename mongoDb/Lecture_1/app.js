const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/nobita")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("error while connecting DB");
    console.log(err);
  });

// schema (blue-print)
const movieSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  year: Number,
  isWatched: Boolean,
});

// defining custom function (two type se define kar sakte hai 1st instance and 2nd static).
movieSchema.methods.changedName = function () {
  //hum isme apna custom method bhee define kar sakte hai. (see https://mongoosejs.com/docs/guide.html)
  this.name = "nikesh" + "TROLOLO";
};

movieSchema.methods.nameChange = function () {
  return this.name + " " + "singh";
};

// model (JS class) --> collection for db
const Movie = mongoose.model("Movie", movieSchema); //js class
// console.log(Movie);

// making a new object
let ironman = new Movie({
  //creates a new object using (model == js class)
  name: "Ironman",
  rating: 8,
  year: 2015,
  isWatched: true,
});

//ironman.save(); //db ke andar us object ko stoe krdega permamnently

const a = ironman.nameChange();
console.log(a);

ironman.changedName();
console.log(ironman);
