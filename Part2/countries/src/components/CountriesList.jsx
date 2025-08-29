import CountryDetails from "./CountryDetails.jsx";

// CountriesList Component
const CountriesList = ({
  countries,
  searchValue,
  countryToShow,
  handleShowDetails,
}) => {
  // console.log(countriesLength);

  // Error message if list is more than 10 items and if searchValue is empty
  if (searchValue && countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  // If only one country remains show details
  if (countries.length === 1) {
    // console.log("Only one country remains:", countries[0]);
    return <CountryDetails country={countries[0]} />;
  }
  if (countryToShow) {
    // console.log("Country to show:", countryToShow);
    return <CountryDetails country={countryToShow} />;
  }

  // setCountryToShow(null);

  return countries.map((country) => {
    // console.log(country);
    return (
      <p key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => handleShowDetails(country)}>Show</button>
      </p>
    );
  });
};

export default CountriesList;
