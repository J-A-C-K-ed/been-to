import React, { memo, useState } from 'react';
import styled from 'styled-components';
import countryPaths from './Countries';

interface CountryProps {
  country: string;
  isVisited: boolean;
  clickHandler: (evt: React.MouseEvent<SVGPathElement>) => void;
}

const Country = ({ country, isVisited, clickHandler }: CountryProps) =>
  countryPaths[country](isVisited, clickHandler);

const StyledMap = styled.svg`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

interface MapProps {
  visited: string[];
  setVisited: (newVisited: string[]) => void;
  setCurrentSel: (country: string) => void;
  currentUser: string;
  setShowForm: (data: boolean) => void;
}

const Map = ({
  visited,
  setVisited,
  setCurrentSel,
  currentUser,
  setShowForm,
}: MapProps) => {
  const createClickHandler = (country: string) => (
    evt: React.MouseEvent<SVGPathElement>
  ) => {
    evt.preventDefault();
    // if (!currentUser) {

    // }

    // if country is already marked
    let newVisited: string[] = [];
    if (visited.includes(country)) {
      setCurrentSel('');
      newVisited = visited.filter((code) => code !== country);
      setShowForm(false);
    } else {
      newVisited = visited.concat(country);
      setCurrentSel(country);
      setShowForm(true);
    }
    addLocationToDB(newVisited);
  };

  //Writing to DB to Save Location
  const addLocationToDB = (updatedCountryList: string[]) => {
    // console.log("🚀 updatingLocation", visited)
    fetch('/locations/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username: currentUser,
        countrycodes: updatedCountryList,
      }),
    })
      .then((res) => {
        if (res.ok) setVisited(updatedCountryList);
      })
      .catch((err) => {
        console.error('There was the following error when trying to pin a location', err);
      });
  };

  return (
    <StyledMap viewBox="0 0 1778.245691804732 1352">
      <g>
        {Object.keys(countryPaths).map((country) => (
          <Country
            key={country}
            country={country}
            isVisited={visited.includes(country)}
            clickHandler={createClickHandler(country)}
          />
        ))}
      </g>
    </StyledMap>
  );
};

export default memo(Map);
