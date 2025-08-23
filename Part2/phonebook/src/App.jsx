import { useState } from "react";

// Single person component
const Person = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};

// PERSONS component for displaying the list
const Persons = ({ persons }) => {
  return (
    <div>
      <Person persons={persons} />
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    setPersons(persons.concat(newPersonObject));

    setNewName(""); // Clear the input field after submission
    setNewNumber("");
    // console.log(persons);
  };

  // Set a new name
  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);

    // search each value for similar
  };

  // Set a new number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // handle filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
