"use client";

import { ProductsListD } from '@/lib/features/products/productTypes';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type DataContext = {
    productList: ProductsListD[];
    setProductList: Dispatch<SetStateAction<ProductsListD[]>>;
}

export const MyContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [productList, setProductList] = useState<ProductsListD[]>([]);

    return (
        <MyContext.Provider value={{
            productList,
            setProductList,
        }}>
            {
                children
            }
        </MyContext.Provider>
    )
}

export const useData = () => useContext(MyContext);

