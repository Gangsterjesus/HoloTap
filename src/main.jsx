import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./flows/Registration.jsx";
import HostPage from "./flows/HostPage.jsx"; // create this file if missing

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/host/:id" element={<HostPage />} />
    </Routes>
  </BrowserRouter>
);





