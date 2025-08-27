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

export default Filter;
