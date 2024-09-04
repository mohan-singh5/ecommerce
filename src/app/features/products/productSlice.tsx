import { createSlice } from "@reduxjs/toolkit"
import { ProductsD } from "../../../../types";

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
        },
        addProduct: (state, action) => {
            state.products.products.unshift(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products.products = state.products.products.filter((i) => i.id !== action.payload.id);
        },
        updateProduct: (state, action) => {
            state.products.products = state.products.products.map((product) => product.id === action.payload.id ? action.payload : product);
        }
    }
})

export const { setproducts, addProduct, deleteProduct, updateProduct } = productReducers.actions;

export default productReducers.reducer;