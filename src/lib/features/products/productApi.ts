import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch('https://dummyjson.com/products');
        const products = await res.json();
        return products;
    },
)