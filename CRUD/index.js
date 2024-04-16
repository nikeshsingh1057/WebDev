const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride("_method")); // now -> _method se bulana hoga (see npm method override on google)

const { v4: uuid } = require('uuid');   // unique id ke liye.
uuid();  // in the form of string

let comments = [
  {
    id: uuid(),   // uuid behind the seen function hai jo eak unique id return karwata hai. string ke form me.
    username: "nikesh",
    comment: "hello ji kaise ",
  },
  {
    id: uuid(),
    username: "abhisek singh",
    comment: "eak din bahut ",
  },
  {
    id: uuid(),
    username: "karan sing",
    comment: "ji lo apni jin",
  },
  {
    id: uuid(),
    username: "kunal",
    comment: "sab ho jayega to",
  },
  {
    id: uuid(),
    username: "kallu",
    comment: "hello hello jilo",
  },
  {
    id: uuid(),
    username: "prince",
    comment: "nahi sudhereoge tum",
  },
];
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // for json this middle ware is used to json data.
app.use(express.urlencoded({ extended: true })); // this middleware for form data. (req.body ke data ko dekhne ke liye)

// root
app.get("/", (req, res) => {
  res.send("<h1> root me aapka swagat hai <h1>");
});

// task 1 to display all blog
app.get("/user", (req, res) => {
  res.render("index", { comments });
});

// task 2 showing form to add new blog
app.get("/blog/new", (req, res) => {
  res.render("new");
});

// task 3 to add blog in db.
app.post("/blogs", (req, res) => {
  let { username, comment } = req.body; // destructure kiye hai.
  comments.push({ username, comment, id : uuid() });
  // console.log(comments);
  res.redirect("/user");
});

// task 4 showing one particular blog in details
app.get("/blogs/:id", (req, res) => {
  let { id } = req.params; // req.params object return karta hai.

  let OneBlog = {};
  for (let i of comments) {
    if (i.id == id) {
      OneBlog = i;
      // console.log(OneBlog)
      break;
    }
  }
  res.render("show", { OneBlog });
});

// to get form for editing blog
app.get("/blog/:id/edit", (req, res) => {
  let { id } = req.params;

  let FoundBlog = {}; // searching that particular blog
  for (let i of comments) {
    if (i.id == id) {
      FoundBlog = i;
      // console.log(FoundBlog)
      break;
    }
  }
  res.render("edit", { FoundBlog });
});

// to update comment of particular bolg
app.patch("/blog/:id", (req, res) => {
  let { id } = req.params;

  let foundBlog = {};
  for (let i of comments) {
    if (i.id == id) {
      foundBlog = i;
      break;
    }
  }
  console.log(req.body);
  foundBlog.comment = req.body.comment; // req.body ko direct use nahi kar sakte hai usko use karne ke liye middle ware istmal karna padtha hai urlencoded upper lagaye hai json ke liye bhee hota hai .
  res.redirect("/user");
});

// deleting a particular blog
app.delete("/blogs/:id", (req, res) => {

  let { id } = req.params; // now array ke ander ye id check karenge using filter method
  let newCommentArr = comments.filter((comm) => {
    return comm.id != id;
  });

  comments = newCommentArr;
  res.redirect("/user");
});

app.listen(8080, () => {
  console.log("server is conntecte at port 8080");
});
