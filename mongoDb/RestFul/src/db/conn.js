const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/students-api")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("error while connecting DB");
    console.log(err);
  });

