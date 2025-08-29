import { useState, useEffect } from "react";
import CountriesList from "./components/CountriesList";
import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [countryToShow, setCountryToShow] = useState(null);
  const [filteredCountries, SetFilteredCountries] = useState([]);

  // Fetch all countries
  useEffect(() => {
    // If no value is inserted
    if (searchValue) {
      // console.log("Fetching countries");
      countriesService.getAll().then((allCountries) => {
        setCountries(allCountries);
      });
    }
  }, [searchValue]);

  // filtered countries without calling api
  useEffect(() => {
    // List of countries to show
    // console.log("countriesList value:", countriesList);
    SetFilteredCountries(
      searchValue === ""
        ? countries
        : countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
    );
  }, [searchValue]);

  // Handle inputs
  const handleSearchCountries = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setCountryToShow(null); // Reset countryToShow when continuing search
    setSearchValue(event.target.value);
  };

  // Handle show details
  const handleShowDetails = (country) => {
    // console.log("Show details for ", country.name.common);
    setCountryToShow(country);
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input value={searchValue} onChange={handleSearchCountries} />
      </p>
      <div>
        <CountriesList
          countries={filteredCountries}
          searchValue={searchValue}
          countryToShow={countryToShow}
          handleShowDetails={handleShowDetails}
        />
      </div>
    </div>
  );
}

export default App;
