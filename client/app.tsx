import React, { useState } from "react";
import UserIcon from "./components/UserIcon";
import UserBadgeDropdown from "./components/UserBadgeDropdown";
import MapWrapper from "./components/MapContainer";
import TripDetailsForm from "./components/TripDetailsForm/TripDetailsForm";
import NewUserPopup from "./components/NewUserPopup";

const App = () => {
  const [currentSel, setCurrentSel] = useState("");
  const [visited, setVisited] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [showPopUp, setShowPopUp] = useState<boolean>(true);

  return (
    <>
      {showPopUp ? <NewUserPopup setShowPopUp={setShowPopUp} /> : null}
      <UserIcon
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        setVisited={setVisited}
        visited={visited}
      />
      <UserBadgeDropdown visited={visited} />
      {currentSel ? <TripDetailsForm /> : null}
      <MapWrapper
        visited={visited}
        setVisited={setVisited}
        currentUser={currentUser}
        setCurrentSel={setCurrentSel}
      />
    </>
  );
};

export default App;
