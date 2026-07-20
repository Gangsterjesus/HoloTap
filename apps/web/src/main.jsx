import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Holo from "./Holo.jsx";



import "./index.css";
import "./styles/Layout.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <Holo />
</BrowserRouter>

);
