import axios from "axios";
import { baseUrl } from "../Config/Baseurl";
import { config } from "../Config/config";

const createProduct = async (Data) => {
  try {
    const res = await axios.post(`${baseUrl}products`,  Data, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const productservices = {
  createProduct,
};

export default productservices;
