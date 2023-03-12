import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './productCounter'

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export default store;