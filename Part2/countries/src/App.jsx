import { useState, useEffect } from "react";
import CountriesList from "./components/CountriesList";
import countriesService from "./services/countries";
import weather from "./services/weather";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [countryToShow, setCountryToShow] = useState(null);
  const [filteredCountries, SetFilteredCountries] = useState([]);
  // const [weatherData, setWeatherData] = useState(null);

  // Fetch all countries
  useEffect(() => {
    // If no value is inserted
    console.log("Fetching countries");
    countriesService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  // filtered countries without calling api
  useEffect(() => {
    // List of countries to show
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
    setCountryToShow(""); // Reset countryToShow when continuing search
    setSearchValue(event.target.value);
  };

  // Handle show details
  const handleShowDetails = (country) => {
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
          setCountryToShow={setCountryToShow}
        />
      </div>
    </div>
  );
}

export default App;
