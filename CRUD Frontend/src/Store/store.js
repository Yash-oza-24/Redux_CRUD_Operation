import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "../Fetures/userSlice"
const reduxstore = configureStore({
    reducer: {
        auth: sliceReducer,
    }
})
export default reduxstore