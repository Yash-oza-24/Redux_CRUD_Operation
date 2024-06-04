/* eslint-disable no-unused-vars */
import axios from "axios";
import { baseUrl } from "../Config/Baseurl";
import {config} from "../Config/config"

const login = async (Data) => {
    console.log(Data)
    const res = await axios.post(`${baseUrl}users/login`,Data) 
    if (res.data) {
      console.log(res.data)
        localStorage.setItem("USER", JSON.stringify(res.data?.user));
        console.log( localStorage.setItem("USER", JSON.stringify(res.data?.user)))
        localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
      }
      return res.data;
}
const register = async (Data) => {
    try {
        console.log(Data);
        const res = await axios.post(`${baseUrl}users`, Data);
        return res.data;
      } catch (error) {
        console.error("Error occurred while making POST request:", error);
        throw error;
      }
}
const getalluser = async () => {
  try{
    
    const res = await axios.get(`${baseUrl}users/alluser` , config)
    console.log(res.data)
    return res.data
  }
  catch (error){
    console.error("Error occurred while making GET request:", error);
    throw error;
  }
}
const deleteuser = async (userId) => {
  try {
    const res = await axios.delete(`${baseUrl}users/${userId}`, config);
    return res.data;
  } catch (error) {
    console.error("Error occurred while deleting user:", error);
    throw error;
  }
};
const updateUser = async (userId, updatedUserData) => {
  try {
    const res = await axios.put(`${baseUrl}users/${userId}`, updatedUserData, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    throw error;
  }
};

const sendOTP = async (Data) => {
  console.log(Data)
  try{
    const res = await axios.post(`http://localhost:5000/otp/send-otp` ,Data);
    console.log(res.data);
    return res.data
  }
  catch (error) {
    console.error("Error occurred while updating user:", error);
    throw error;
  }
}
const verifyOTP = async ({phoneNumber , otp}) => {
  console.log({phoneNumber , otp})
  try{
    const res = await axios.post(`http://localhost:5000/otp/verify-otp` ,{phoneNumber, otp});
    console.log(res.otp);
    return res.data
  }
  catch (error) {
    console.error("Error occurred while updating user:", error);
    throw error;
  }
}
const logout = () => {
  localStorage.removeItem("USER")
}
const userServices = {
    login,
    register,
    getalluser,
    logout,
    updateUser,
    deleteuser,
    sendOTP,
    verifyOTP
}

export default userServices