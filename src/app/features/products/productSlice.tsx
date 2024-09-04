import { createSlice } from "@reduxjs/toolkit"
import { ProductsD } from "../../../../types"

export interface ProductState {
    products: ProductsD[],
    total: number;
    skip: number;
    limit: number;
}

const initialState = {
    products: {} as ProductState
}

const productReducers = createSlice({
    name: "products",
    initialState,
    reducers: {
        setproducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { setproducts } = productReducers.actions;

export default productReducers.reducer;