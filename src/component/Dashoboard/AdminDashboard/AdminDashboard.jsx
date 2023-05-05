import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddEmployee from "../AddEmployee/AddEmployee";
import EmployeeList from "../EmployeeList/EmployeeList";

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="employeeList" element={<EmployeeList />} />
      <Route path="addEmployee" element={<AddEmployee />} />
    </Routes>
  );
};

export default AdminDashboard;
