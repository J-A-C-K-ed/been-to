import React, { useState } from 'react';
import UserIcon from './components/UserIcon';
import UserBadgeDropdown from './components/UserBadgeDropdown';
import MapWrapper from './components/MapContainer';
import TripDetailsForm from './components/TripDetailsForm/TripDetailsForm';

const App = () => {
  const [currentSel, setCurrentSel] = useState('');
  const [visited, setVisited] = useState<string[]>([]);


  return (
    <>
      <UserIcon />
      <UserBadgeDropdown />
      {currentSel ? <TripDetailsForm /> : null}
      <MapWrapper visited={visited} setVisited={setVisited} setCurrentSel={setCurrentSel} />
    </>
  );
};

export default App;
