import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [countryToShow, setCountryToShow] = useState(null);

  useEffect(() => {
    // If no value is inserted
    if (searchValue) {
      console.log("Fetching countries");
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          setCountriesList(response.data);
        });
    }
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
    console.log("Show details for ", country.name.common);
    setCountryToShow(country);
  };
  // DEBUGGING
  // if (countriesList) {
  //   console.log(countriesList[0]);
  // }

  // List of countries to show
  // console.log("countriesList value:", countriesList);
  const filteredCountries =
    searchValue === ""
      ? countriesList
      : countriesList.filter((country) =>
          country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        );

  // CountriesList Component
  const CountriesList = ({ countries }) => {
    // console.log(countriesLength);

    // Error message if list is more than 10 items and if searchValue is empty
    if (searchValue && filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    // If only one country remains show details
    if (filteredCountries.length === 1) {
      console.log("Only one country remains:", filteredCountries[0]);
      return <CountryDetails country={filteredCountries[0]} />;
    }
    if (countryToShow) {
      console.log("Country to show:", countryToShow);
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

  // Country Details Component
  const CountryDetails = ({ country }) => {
    // if (filteredCountries.length === 1) {
    // console.log(country.languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language, code) => {
            // console.log(language);
            return <li key={code}>{language}</li>;
          })}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
    // }
  };
  return (
    <div>
      <p>
        find countries{" "}
        <input value={searchValue} onChange={handleSearchCountries} />
      </p>
      <div>
        {/* {countriesList && <CountriesList countries={filteredCountries} />} */}
        <CountriesList countries={filteredCountries} />
        {/* <CountryDetails country={filteredCountries[0]} /> */}
      </div>
    </div>
  );
}

export default App;
