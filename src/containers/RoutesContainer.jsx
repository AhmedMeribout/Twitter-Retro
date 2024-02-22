import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Explorer from "../pages/Explorer";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";

import Layout from "../pages/Layout.jsx";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Layout children={<Home />} />} />
        <Route path="/explore" element={<Layout children={<Explorer />} />} />
        <Route
          path="/notifications"
          element={<Layout children={<Notifications />} />}
        />
        <Route path="/not-found" element={<Layout children={<NotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
