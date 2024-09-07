import { createSlice } from "@reduxjs/toolkit"
import { ProductResD } from "./productTypes";


export interface ProductState {
    products: ProductResD;
    totalPrice: number;
}

const initialState: ProductState = {
    products: {} as ProductResD,
    totalPrice: 0
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