import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {bagCounter: 0, bagProducts: []}
let temp: any
const bagArray: any[]= []
let tempCount: number= 0

const cam = (newProduct: any) => {
    console.log(newProduct)
    if(!newProduct.inBag){
        newProduct["inBag"] = 1
        temp = newProduct
    }
    else {
        newProduct.inBag++
    }
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state, action){
            const obj = action.payload
            cam(obj)
            bagArray.push(temp)
            tempCount += temp.inBag
            state.bagProducts = [...bagArray]
            state.bagCounter = tempCount
            console.log(state.bagProducts)
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer