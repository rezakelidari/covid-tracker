import React, { useEffect, useState } from "react";
import Styles from "./styles/App.module.css";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const CountriesApi = "https://covid19.mathdro.id/api/countries";
  const [countries, setCountries] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const searchResult = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios.get(CountriesApi).then((result) => {
      setCountries(result.data.countries);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={Styles.appMain}>
      <h1>Covid-19 Tracker</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="search"
          placeholder="Type a country"
          className={Styles.formInput}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>

      <div className={Styles.appResult}>
        {loading ? (
          <div className={Styles.resultLoading}>Loading...</div>
        ) : (
          searchResult.map(
            (country) =>
              country.iso3 && (
                <Country
                  name={country.name}
                  iso2={country.iso2}
                  iso3={country.iso3}
                  key={country.name}
                />
              )
          )
        )}
      </div>
    </div>
  );
}

export default App;
