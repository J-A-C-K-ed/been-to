import CountryListCard from "./CountryListCard";
import React from "react";

const CountryList = (props: any): any => {
  let fakeState = ["England", "Japan", "Germany", "Canada"];
  return (
    <div>
      {fakeState.map((country, idx) => {
        return <CountryListCard Country={country} key={`${country} card`} />;
      })}
    </div>
  );
};

export default CountryList;
