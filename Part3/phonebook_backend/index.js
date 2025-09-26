require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Require cors to connect frontend and backend

const Person = require("./models/person");

const app = express();

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// USE MIDDLEWARES
app.use(express.json());
// Manually create the token for data
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body); // convert from an object to string
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
); // set up logger
app.use(cors());
app.use(express.static("dist")); // Middleware for showing Static file from dist

// Get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// GET SINGLE PERSON BY ID
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// GET info page
app.get("/info", async (request, response) => {
  const timeOfRequest = new Date();
  const persons = await Person.find({});

  response.send(`<div>
    <p>Phone has info for ${persons.length} people</p>
    <p>${timeOfRequest}</p>
    </div>`);
});

// DELETE a person
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// ADD a person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  // else if (Person.find({ name: body.name })) {
  //   console.log(`${body.name} is a duplicate.`);
  //   const personFound = Person.findOne({ name: body.name });
  //   personFound.number = body.number;
  // }

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// UPDATE a person
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }
      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
