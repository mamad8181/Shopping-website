import { getProducts } from "@/api";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

// useEffect(() => {
//     const productsGetter = async () => {
//       const response = await getProducts()
//       setProducts([...response.data])
//     }
//     productsGetter()
//   }, [])

const initialState = {counter: 0}


const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state, action){
            state.counter = action.payload + 1
        },
        decrement(state, action){
            state.counter = action.payload - 1
        }
    }
})

// console.log(counterSlice.getInitialState())

export const counterActions = counterSlice.actions

export default counterSlice.reducer