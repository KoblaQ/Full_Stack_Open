import { useState } from "react";

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

  // Numbers component for displaying the list
  const Numbers = ({ persons }) => {
    return (
      <div>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with{" "}
        <input
          placeholder="Search phonebook"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {/* <Numbers persons={persons} /> */}
      <div>
        {filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
