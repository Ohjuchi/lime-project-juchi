import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";

import Login from "./Pages/Login.js";
import Main from "./Pages/Main";
import SingUp from "./Pages/SingUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>APP 입니다</h1>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
