const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Require cors to connect frontend and backend

const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
// Manually create the token for data
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body); // convert from an object to string
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
); // set up logger
app.use(cors());

// Get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// GET single person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// GET info page
app.get("/info", (request, response) => {
  const timeOfRequest = new Date();
  response.send(`<div>
    <p>Phone has info for ${persons.length} people</p>
    <p>${timeOfRequest}</p>
    </div>`);
});

// DELETE a person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// Generate new ID value
const generateId = () => {
  return String(Math.floor(Math.random() * 100));
};

// POST / ADD a person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  const new_person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  // Add the new person object to the persons array
  persons = persons.concat(new_person);

  response.json(new_person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
