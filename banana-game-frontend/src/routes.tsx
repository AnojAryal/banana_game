import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NotAvailPage from "./components/NotAvailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotAvailPage />} />
    </Routes>
  );
};

export default AppRoutes;
