 // eslint-disable-next-line
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Cardregi from "./Components/Cardregi";
import AdminRegistration from "./Components/AdminRegistration";
import UserRegistration from "./Components/UserRegistration";
// import Home from "./Components/Home";
import Usersdata from "./Components/Userdata";
import Dashboard from "./Components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Usersdata />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Cardregi />}/>
        <Route path="/user-register" element={<UserRegistration />}/>
        <Route path="/admin-register" element={<AdminRegistration />}/>
        <Route path="/usersdata" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
