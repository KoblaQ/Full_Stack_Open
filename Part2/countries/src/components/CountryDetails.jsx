// Country Details Component
const CountryDetails = ({ country }) => {
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
};

export default CountryDetails;
