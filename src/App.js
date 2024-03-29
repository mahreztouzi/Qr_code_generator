import Home from "../src/component/Home/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext } from "react";
import About from "./component/Home/About/About";
import Dashboard from "./component/Dashoboard/Dashboard/Dashboard";
import LoginModal from "./component/Login/LoginModal";
import PrivateRoute from "./component/Login/PrivateRoute";
import NotFound from "./component/NotFound";
import UserProfile from "./component/UserProfile/UserProfile";
import Admin from "./component/Admin/Admin";
export const UserContext = createContext();

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute redirectTo="/admin">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
