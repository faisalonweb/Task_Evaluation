import React from "react";
import Users from "./pages/users";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Users />
    </>
  );
};

export default App;
