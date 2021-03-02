import React, { useState } from 'react';
import styled from 'styled-components';
import Datamap from 'react-datamaps';

const MapContainer = styled.div`
  height: 100vh;
  width: 100vw;

  & .datamap path {
    cursor: pointer;
  }
`;

// TODO: check class agains defined list of country codes
const isCountryCode = (className: string) => className.length === 3;

/**
 * Attemps to get country code from elements list of classNames. 
 * Returns empty string if not found
 */
const getCountry = (target: EventTarget) => {
  if (!(target as Element)?.classList) return '';

  let country = '';
  (target as Element).classList.forEach((className) => {
    if (isCountryCode(className)) country = className;
  });
  return country;
};

interface countryData {
  fillKey: 'visited' | 'defaultFill';
}

/**
 * adds or remove country to object with fillKey 'visited'. 
 * Doesn't mutate object passed as first param.
 * @param mapData Map mapData state object
 * @param country Country code string
 */
const toggleCountry = (mapData: Record<string, countryData>, country: string) => {
  const dataCopy = { ...mapData };
  if (dataCopy[country]) {
    delete dataCopy[country];
    return dataCopy;
  }

  dataCopy[country] = { fillKey: 'visited' };
  return dataCopy;
};

const Map = () => {
  const [mapData, setMapData] = useState({});

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    const country = getCountry(evt.target);
    if (!country) return;
    setMapData(toggleCountry(mapData, country));
  };

  return (
    <MapContainer onClick={handleClick}>
      <Datamap
        projection="mercator"
        style={{ width: 'auto', height: '100vh' }}
        fills={{
          defaultFill: '#ABDDA4',
          visited: '#ff0000',
        }}
        data={mapData}
        updateChoroplethOptions={{ reset: true }}
      />
    </MapContainer>
  );
};

export default Map;
