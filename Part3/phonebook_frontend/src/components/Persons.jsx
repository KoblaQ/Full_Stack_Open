import Person from "./Person";

// PERSONS component for displaying the list
const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      <Person persons={persons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default Persons;
