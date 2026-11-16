import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { API_BASE_URL, FRONTEND_URL } from "../config";

const Home = () => {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/verify`, { withCredentials: true })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthStatus("authenticated");
          return;
        }
        window.location.assign(`${FRONTEND_URL}/login`);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.assign(`${FRONTEND_URL}/login`);
          return;
        }
        setAuthStatus("error");
      });
  }, []);

  if (authStatus === "checking") {
    return <p role="status">Checking your session...</p>;
  }

  if (authStatus === "error") {
    return <p role="alert">Unable to verify your session. Please try again.</p>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;