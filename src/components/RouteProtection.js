import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Dashboard from "../pages/Dashboard";

const RouteProtection = ({ children }) => {
    const { auth } = useAuth();
  
    if (!auth) {
        return <Navigate to="/login" />
    }

    return children;
  };

export default RouteProtection;