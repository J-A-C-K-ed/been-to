import CountryListCard from "./CountryListCard";
import React, { useState } from "react";
import styled from "styled-components";

interface CountryListProps {
  countries: [];
}

const CountryList: React.FC<any> = (props) => {
  let fakeState = ["England", "Japan", "Germany", "Canada"];
  const [countries, setCountries] = useState<string[]>(fakeState);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          style={{
            color: "black",
            fontWeight: "bolder",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Helvetica",
            textAlign: "center",
          }}
        >
          Filter your trips by country
          <input
            type='text'
            placeholder='Filter your trips by country'
            style={{
              border: "none",
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              padding: "1rem 4rem 1rem 4rem",
              borderRadius: "1rem",
              color: "black",
              overflow: "visible",
              marginTop: "5%",
            }}
            onChange={(event) =>
              setCountries(
                countries.filter((country) => country === event.target.value)
              )
            }
          />
        </label>

        <div>
          {countries.map((country: string, idx: number) => {
            return (
              <CountryListCard
                Country={country}
                key={`${country}-card-${idx}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CountryList;
