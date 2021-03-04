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
  const [currentUserID, setCurrentUserID] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showPopUp ? <NewUserPopup setShowPopUp={setShowPopUp} /> : null}
      <UserIcon
        setCurrentUser={setCurrentUser}
        setCurrentUserID={setCurrentUserID}
        currentUser={currentUser}
        setVisited={setVisited}
        visited={visited}
      />
      <UserBadgeDropdown
        visited={visited}
        currentUser={currentUser}
        currentUserID={currentUserID}
      />
      {currentSel && showForm ? (
        <TripDetailsForm
          setShowForm={setShowForm}
          currentUserID={currentUserID}
          currentSel={currentSel}
          currentUser={currentUser}
        />
      ) : null}
      <MapWrapper
        visited={visited}
        setVisited={setVisited}
        currentUser={currentUser}
        setCurrentSel={setCurrentSel}
        setShowForm={setShowForm}
      />
    </>
  );
};

export default App;
