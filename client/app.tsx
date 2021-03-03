import React, { useState } from "react";
import UserIcon from "./components/UserIcon";
import UserBadgeDropdown from "./components/UserBadgeDropdown";
import styled from "styled-components";
import TripDetailsForm from "./components/TripDetailsForm/TripDetailsForm";
import TopNav from "./components/TopNav";

const StyledUserIcon = styled(UserIcon)`
   {
    margin-bottom: 30%;
  }
`;

interface AppProps {}

const App: React.FC<any> = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  if (showForm === false) {
    return (
      <div>
        <div style={{ marginLeft: "95%" }}>
          <StyledUserIcon />
        </div>
        <div style={{ marginLeft: "95%", marginTop: "20%" }}>
          <UserBadgeDropdown />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ marginLeft: "95%" }}>
          <StyledUserIcon />
        </div>
        <div style={{ marginLeft: "95%", marginTop: "20%" }}>
          <UserBadgeDropdown />
        </div>
        <TripDetailsForm />
      </div>
    );
  }
};

export default App;
