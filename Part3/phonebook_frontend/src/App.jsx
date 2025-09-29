import { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

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

    // new person object
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    //Check for duplicates
    const isDuplicate = persons.some((person) => person.name === newName);
    if (isDuplicate) {
      // alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };

        console.log(
          `Updating person number from ${person.number} to ${changedPerson.number}`
        );
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            );
          })
          .catch((error) => {
            setNotification(
              `Information of ${person.name} has already been removed from server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
        setNewName(""); // Clear the input field after submission
        setNewNumber("");
      }
    } else {
      // Add new person to the database
      personService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          setNotification(`${error.response.data.error}`);
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }

    // Update notification
    setNotification(`Added ${newPersonObject.name}`);
    setNotificationType("success");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setNewName(""); // Clear the input field after submission
    setNewNumber("");
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
      <Notification
        message={notification}
        notificationType={notificationType}
      />
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
