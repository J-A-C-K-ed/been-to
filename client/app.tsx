import React, { useState } from 'react';
import Map from './components/Map';
import Hover from './components/Hover'

const App = () => {
  const [hoveredCountry, setHoveredCountry] = useState('');

  return (
    <>
      <Map setHovered={setHoveredCountry} />
      <Hover country={hoveredCountry} />
    </>
  );
};

export default App;
