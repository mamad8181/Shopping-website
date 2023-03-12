import { createSlice } from "@reduxjs/toolkit";

const initialState = {bagCounter: 0, bagProducts: []}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state, action){
            const obj= action.payload
            state.bagProducts = [...state.bagProducts, obj]
            state.bagCounter = state.bagProducts.length
            console.log(state.bagProducts)
            console.log(action.payload)
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer