import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "../Feature/CardSlice";

 const store = configureStore({
    reducer:{
       allCart : CardReducer,
    },
});
export default store;