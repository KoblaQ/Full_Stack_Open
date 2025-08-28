import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  // DEBUGGING
  if (countriesList) {
    console.log(countriesList[0]);
  }

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
    const countriesLength = countries.length;
    console.log(countriesLength);

    // Error message if list is more than 10 items and if searchValue is empty
    if (searchValue && filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    // If only one country remains
    if (searchValue && countriesLength === 1) {
      return <div>Single </div>;
    }

    return countries.map((country) => {
      return <p key={country.name.common}>{country.name.common}</p>;
    });
  };

  // Country Details Component
  const CountryDetails = ({ country }) => {
    if (filteredCountries.length === 1) {
      console.log(country.languages);
      const object = {
        a: "some string",
        b: 42,
        c: false,
      };
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((language, code) => {
              console.log(language);
              return <li key={code}>{language}</li>;
            })}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
      );
    }
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
        <CountryDetails country={filteredCountries[0]} />
      </div>
    </div>
  );
}

export default App;
