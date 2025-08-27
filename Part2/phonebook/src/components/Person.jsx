// Single person component
const Person = ({ persons, handleDeletePerson }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </p>
  ));
};

export default Person;
