import { createSlice } from "@reduxjs/toolkit"
import { ProductResD } from "./productTypes";

const couponCode = "COUP1234";
export interface ProductState {
    products: ProductResD;
    totalPrice: number;
    couponApplied: boolean;
}

const initialState: ProductState = {
    products: {} as ProductResD,
    totalPrice: 0,
    couponApplied: false
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
        },
        applyCoupon: (state, action) => {
            const coupon = action.payload;

            if (!coupon) {
                alert("Please enter a coupon code");
                return;
            }

            if (state.couponApplied) {
                alert("Coupon code is already applied");
                return;
            }

            if (coupon.trim() === couponCode) {
                const discount = 0.20; // 20% discount
                state.totalPrice = state.totalPrice * (1 - discount);
                state.couponApplied = true;
            } else {
                alert("Please enter the correct coupon code");
            }
        }
    }
})

export const { setproducts, addProduct, deleteProduct, updateProduct, applyCoupon } = productReducers.actions;

export default productReducers.reducer;