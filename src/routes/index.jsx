import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/privateRoute";


import HomePage from "../pages/HomePage";
import AddNotePage from "../pages/AddNotePage";
import EditNotePage from "../pages/EditNotePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
      </Route>
    </Routes>
  );
}
