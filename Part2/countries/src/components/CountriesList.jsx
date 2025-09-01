import CountryDetails from "./CountryDetails.jsx";

// CountriesList Component
const CountriesList = ({
  countries,
  searchValue,
  countryToShow,
  handleShowDetails,
}) => {
  // Error message if list is more than 10 items and if searchValue is empty
  if (searchValue && countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  // If only one country remains show details
  if (countries.length === 1 || countryToShow) {
    return <CountryDetails country={countries[0]} />;
  }

  return countries.map((country) => {
    return (
      <p key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => handleShowDetails(country)}>Show</button>
      </p>
    );
  });
};

export default CountriesList;
