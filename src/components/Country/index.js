import axios from "axios";
import React, { useEffect, useState } from "react";
import Styles from "./Country.module.css";

function Country({ name, iso2, iso3 }) {
  const countryDetailApi = `https://covid19.mathdro.id/api/countries/${iso3}`;
  const countryFlagApi = `https://flagcdn.com/h20/${iso2.toLowerCase()}.png`;
  const [loading, setIsLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [error, setHaveError] = useState(false);

  useEffect(() => {
    axios
      .get(countryDetailApi)
      .then((response) => {
        setConfirmed(response.data.confirmed.value);
        setDeaths(response.data.deaths.value);
        setIsLoading(false);
      })
      .catch((error) => setHaveError(true));
  }, []);

  return (
    <div className={`${Styles.countryMain} ${error && Styles.countryError}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img src={countryFlagApi} alt={name} className={Styles.countryFlag} />
          <h1 className={Styles.countryName}>{name}</h1>
          <div className={Styles.countryDetils}>
            <div className={Styles.countryDetilContainer}>
              <h3 className={Styles.countryConfirmedTitle}>Confirmed:</h3>
              <p className={Styles.countryConfirmedValue}>{confirmed}</p>
            </div>

            <div className={Styles.countryDetilContainer}>
              <h3 className={Styles.countryDeathsTitle}>Deaths:</h3>
              <p className={Styles.countryDeathsValue}>{deaths}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Country;
