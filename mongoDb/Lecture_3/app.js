           // mongoDb atlas se connect karna.

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL;
const DATABASE_PASSWORD = process.env.DT_PASSWORD;

console.log("Demo Database URL:", DB_URL);
console.log("Demo Port:", DATABASE_PASSWORD);

const DB = DB_URL.replace("<PASSWORD>", DATABASE_PASSWORD);
// console.log(DB);

mongoose
  .connect(DB)
  .then((con) => {
    console.log(`DB connected successfully: ${con.connection}`);
  })
  .catch((err) => {
    console.error("DB connection error:");
    console.error(err);
  });

const Schema = new mongoose.Schema({
  name: String,
  age: Number,
  roll: Number,
});

const Student = mongoose.model("Student", Schema);

const createDocument = async () => {
  try {
    const s1 = new Student({ name: "ram", age: 31, roll: 21155 });
    const s2 = new Student({ name: "raman kr", age: 31, roll: 21155 });
    const s3 = new Student({ name: "ram kaka", age: 1, roll: 5 });
    const s4 = new Student({ name: "meenu", age: 312, roll: 550 });
    const s5 = new Student({ name: "mina kumari", age: 209, roll: 8770 });

    await Student.insertMany([s1, s2, s3, s4, s5]);
    console.log("Documents inserted successfully.");
  } catch (err) {
    console.error("Error inserting documents:");
    console.error(err);
  }
};

const getDocument = async () => {
  try {
    const result = await Student.find().sort({ name: 1 });
    console.log(result);
  } catch (err) {
    console.error("Error retrieving documents:");
    console.error(err);
  }
};

createDocument();
// getDocument();

console.log("nikch aaya");

console.log("chal gaya");
