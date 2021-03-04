import CountryListCard from "./CountryListCard";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import styled from "styled-components";
import countriesKey from "../../countries";

interface CountryListProps {
  countries: [];
}

const StyledButton = styled(Button)`
   {
    margin-left: 10%;
  }
`;
const CountryList: React.FC<any> = ({ visited }) => {
  let fakeState = ["England", "Japan", "Germany", "Canada"];
  const [countries, setCountries] = useState<any>(fakeState);
  const [filtered, setFiltered] = useState<string>("");
  const handleClick = () => {
    let match = countries.filter(
      (country: string) => country.toLowerCase() === filtered.toLowerCase()
    )[0];
    if (match.length > 0) {
      setCountries([match]);
    }
  };
  const handleReset = () => {
    setCountries(fakeState);
  };
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
            onChange={(event) => setFiltered(event.target.value)}
          />
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <div
            style={{
              marginRight: "10%",
            }}
          >
            <StyledButton
              variant='contained'
              color='primary'
              onClick={handleClick}
            >
              Filter
            </StyledButton>
          </div>
          <StyledButton
            variant='contained'
            color='secondary'
            onClick={handleReset}
          >
            Reset
          </StyledButton>
        </div>

        <div>
          {visited.map((country: any, idx: number) => {
            let countryName = !country ? country : countriesKey[country];
            return (
              <CountryListCard
                Country={countryName}
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
