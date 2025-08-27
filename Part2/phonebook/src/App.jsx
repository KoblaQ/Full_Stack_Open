import { useEffect, useState } from "react";
// import axios from "axios";
import personService from "./services/persons";

// Single person component
const Person = ({ persons, handleDeletePerson }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </p>
  ));
};

// PERSONS component for displaying the list
const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      <Person persons={persons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

// PersonForm Component
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addNewName,
}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Filter Component
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with{""}
      <input
        placeholder="Search phonebook"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Use effect getting data from the server.
  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "notes");

  // Add a new name
  const addNewName = (event) => {
    event.preventDefault();
    // setNewName(event.target.value);

    //Check for duplicates
    const isDuplicate = persons.some((person) => person.name === newName);
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // new person object
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    // Add new person to the database
    personService.create(newPersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    // axios
    //   .post("http://localhost:3001/persons", newPersonObject)
    //   .then((response) => {
    //     setPersons(persons.concat(response.data));
    //   });

    // setPersons(persons.concat(newPersonObject));

    setNewName(""); // Clear the input field after submission
    setNewNumber("");
    // console.log(persons);
  };

  // Set a new name
  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  // Set a new number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // handle filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // handle delete person
  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  // List of persons to show after search
  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewName={addNewName}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
