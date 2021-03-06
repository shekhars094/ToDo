const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("./db/mongodb");
const toDo = require("./db/model/todo");

const app = express();
const port = process.env.PORT || 8000;

const publicDirectoryPath = path.join(__dirname + "/public");
const viewsPath = path.join(__dirname, "./templates/views");

app.locals.basedir = path.join(__dirname, "templates");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicDirectoryPath));
app.set("view engine", "pug");
app.set("views", viewsPath);

app.post("/", (req, res) => {
  const todos = new toDo(req.body);
  todos
    .save()
    .then(() => {})
    .catch(err => {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/", (req, res) => {
  toDo
    .find()
    .then(data => {
      res.render("index", { name: data });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/edit", (req, res) => {
  var taskNumber = req.body.id;
  toDo
    .findOneAndUpdate({ taskPriority: taskNumber }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/delete", (req, res) => {
  res.render("delete");
});

app.post("/delete", (req, res) => {
  var ids = req.body.id;
  toDo
    .findOneAndDelete({ taskPriority: ids })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("App is running at ", port);
});
