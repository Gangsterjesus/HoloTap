/**
 * ============================================================
 *  HoloTap — Application Wrapper
 *  File: src/App.jsx
 * ============================================================
 */

import "./index.css";
import MainRouter from "./MainRouter.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <MainRouter />
    </div>
  );
}
