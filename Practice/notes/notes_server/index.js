require("dotenv").config();
const express = require("express");
const app = express();
// const cors = require("cors");
const Note = require("./models/note");

// Mongoose setup
// const mongoose = require("mongoose");

// const password = process.argv[2];
// const url = `mongodb+srv://KoblaQ:${password}@cluster0.m8d64pf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Middleware recieving three parameters
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// USES
app.use(express.json());
app.use(requestLogger);
// app.use(cors());
app.use(express.static("dist")); // Middleware for showing Static file from dist

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// app.get("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   const note = notes.find((note) => note.id === id);

//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    // id: generateId(),
  });

  // notes = notes.concat(note);
  // response.json(note);

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// Unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
