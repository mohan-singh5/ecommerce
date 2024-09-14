import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";


export const store = configureStore({
    reducer: {
        products: productSlice
    },
})

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch