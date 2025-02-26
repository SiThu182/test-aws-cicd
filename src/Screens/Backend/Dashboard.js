import {
  Box,
  //   Button,
  //   Card,
  //   CardContent,
  //   CardHeader,
  //   CircularProgress,
  //   Divider,
  //   LinearProgress,
  //   Pagination,
  //   Paper,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { fetchTextFile } from "./CourseTest/CalculationForWritingSections.js/CalculateScore";

// const getItemsWithPrefix = (prefix) => {
//   const keys = Object.keys(localStorage);

//   const filteredKeys = keys.filter((key) => key.startsWith(prefix));

//   // const items = filteredKeys.reduce((result, key) => {
//   //   result[key] = localStorage.getItem(key);
//   //   return result;
//   // }, {});

//   // return items;

//   let userId = localStorage.getItem("userId");
//   filteredKeys.forEach((key) => {
//     let saveMt = localStorage.getItem(key);
//     localStorage.setItem(userId + key, saveMt);
//     localStorage.removeItem(key);
//   });
// };

// const prefix = "save";
// getItemsWithPrefix(prefix);

function Dashboard() {
  const { role } = useSelector((state) => state.user);
  
  return <>{role === 1 ? <AdminDashboard /> : <UserDashboard />}</>;
}

export default Dashboard;
