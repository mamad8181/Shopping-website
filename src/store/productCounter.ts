import { createSlice } from "@reduxjs/toolkit";

const initialState = {bagCounter: 0, bagProducts: []}

const cam = (bagProducts: any, newProduct: any) => {
    if(bagProducts.length == 0){
        newProduct.quantity = 1
        bagProducts = [newProduct]
        return bagProducts
    }
    else{
        console.log(bagProducts)
        bagProducts?.map((product:any) => product.id == newProduct.id ? () => {
            product.quantity++
            return bagProducts
        } : () => {
            newProduct.quantity = 1
            bagProducts = [...bagProducts, newProduct]
            return bagProducts
        })
    }
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state, action){
            let temp: number = 0
            console.log(state.bagProducts)
            const arrayTemp = cam(state.bagProducts, action.payload)
            state.bagProducts = arrayTemp
            // state.bagProducts.length != 0 && state.bagProducts.map((product:any) => (product && product.id == action.payload.id) ? product.quantity++ : cam(action.payload))
            // state.bagProducts = [...state.bagProducts, action.payload]
            state.bagProducts.map((product:any) => temp = temp + product.quantity)
            state.bagCounter = temp
            console.log(temp)
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer