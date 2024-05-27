// import { createStoreHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../Reducer/CommonReducer";

const store=configureStore({
    reducer:{
        user:registerSlice,
        
    }
});

export default store;