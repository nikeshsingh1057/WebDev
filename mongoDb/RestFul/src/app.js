const express = require("express");
const app = express();
require("./db/conn");
app.use(express.json()); // json data ke liye middle ware hai.

const router = require("./router/rout");
app.use(router);   // agar isme path nahi dete hai then ye bhee work karega but isme direct lochahost:8080 ke badd path liknah hoga.

//app.use("/Student", router);  // agar isme path dete hai then kisi bhee path par visit karne se pahele Student likhna mendatatory hai e.g -> localhost:8000/Student/signup or localhost:8080/Students/Login etc.

app.get("/", (req, res) => {
  res.send("root me aapka swagat hai.");
});

app.get("*", (req, res) => {
  res.status(404).send("Bad Request");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(` server is connected at port ${port}`);
});
