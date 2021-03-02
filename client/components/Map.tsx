import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Datamap from 'react-datamaps';

const MapContainer = styled.div`
  height: 100vh;
  width: 100vw;

  & .datamap path {
    cursor: pointer;
  }
`;

// TODO: check class against defined list of country codes
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
const toggleCountryVisited = (mapData: Record<string, countryData>, country: string) => {
  const dataCopy = { ...mapData };
  if (dataCopy[country]) {
    delete dataCopy[country];
    return dataCopy;
  }

  dataCopy[country] = { fillKey: 'visited' };
  return dataCopy;
};

const calculateWidth = (winWidth: number, winHeight: number, mapRatio: number) => {
  if (winHeight > winWidth) return winWidth * mapRatio;
  return winHeight * mapRatio
};

const Map = () => {
  const [mapData, setMapData] = useState({});
  const [winHeight, setHeight] = useState(window.innerHeight);
  const [winWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const projection = 'mercator';
  const mapRatios = {
    mercator: 568 / 360.94,
  };

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    const country = getCountry(evt.target);
    if (!country) return;
    setMapData(toggleCountryVisited(mapData, country));
  };

  return (
    <MapContainer onClick={handleClick}>
      <Datamap
        projection={projection}
        style={{ width: 'auto', height: '100vh' }}
        fills={{
          defaultFill: '#ABDDA4',
          visited: '#ff0000',
        }}
        data={mapData}
        updateChoroplethOptions={{ reset: true }}
        height={winHeight}
        width={calculateWidth(winWidth, winHeight, mapRatios[projection])}
      />
    </MapContainer>
  );
};

export default Map;
