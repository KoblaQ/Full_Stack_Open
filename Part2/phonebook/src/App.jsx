import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

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
    };

    setPersons(persons.concat(newPersonObject));

    setNewName(""); // Clear the input field after submission
    // console.log(persons);
  };

  // Set a new name
  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  // Numbers component for displaying the list
  const Numbers = ({ persons }) => {
    return (
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName} onChange={handleNameChange}>
        <div>
          name: <input value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* <Numbers persons={persons} /> */}
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
