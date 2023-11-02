import { cibWindows } from "@coreui/icons";
import React, { useEffect, useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const [getLogin, setGetLogin] = useState(localStorage.getItem("Login"));

  useEffect(() => {
    if (!getLogin) {
      window.location = "http://localhost:4000/#/login";
    }
  });

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
