import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {bagCounter: 0, bagProducts: []}
let temp: any={}
const bagArray: any[]= []
let tempCount: number= 0

const addProductHandler = (newProduct: any) => {
    temp = {}
    if(!newProduct.inBag){
        newProduct["inBag"] = 1
        temp = newProduct
        tempCount++
        bagArray.push(temp)
    }
    else {
        let index: number= 0
        bagArray.map((product: any, i: number) => product.id == newProduct.id && (index = i))
        temp = {...bagArray[index]}
        temp.inBag++
        bagArray[index] = temp
        tempCount++
        console.log(temp)
    }
}

const removeProductHandler = (goalProduct: any) => {
    bagArray.map((product: any, index: number) => product.id == goalProduct.id && bagArray.splice(index, 1))
}

const removeOneHandler = (goalProduct: any) => {
    let index: number= 0
    bagArray.map((product: any, i: number) => product.id == goalProduct.id && (index = i))
    temp = {...bagArray[index]}
    temp.inBag--
    bagArray[index] = temp
    tempCount--
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        addProduct(state, action){
            addProductHandler(action.payload)
            state.bagProducts = [...bagArray]
            state.bagCounter = tempCount
            console.log(state.bagProducts)
        },
        removeProduct(state, action){
            tempCount = tempCount - action.payload.inBag
            removeProductHandler(action.payload)
            state.bagProducts = [...bagArray]
            state.bagCounter = tempCount
        },
        removeOne(state, action){
            removeOneHandler(action.payload)
            state.bagProducts = [...bagArray]
            state.bagCounter = tempCount
        }
    }
})

export const counterActions = counterSlice.actions

export default counterSlice.reducer