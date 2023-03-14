import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {bagCounter: 0, bagProducts: []}
let newBag: any[] = []

const cam = (bagProducts: any, newProduct: any) => {
    newBag = []
    if(!bagProducts.length){
        newProduct["inBag"] = 1
        newBag.push(newProduct)
    }
    else {
        bagProducts.map((product: any) => newBag.push(product))
        const found = newBag.find((product: any) => product.id == newProduct.id && product.inBag++)
        if(!found){
            newProduct["inBag"] = 1
            newBag.push(newProduct)
        }
    }
    console.log(bagProducts)
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state, action){
            console.log(state.bagProducts)
            let tempCount: number= 0
            cam(state.bagProducts, action.payload)
            newBag.map((product: any) => {
                state.bagProducts.push(product)
                tempCount += product.inBag
            })
            state.bagCounter = tempCount
            console.log(state.bagCounter)
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer