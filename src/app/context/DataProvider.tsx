"use client";

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { ProductsD } from '../../../types';

type DataContext = {
    productList: ProductsD[];
    setProductList: Dispatch<SetStateAction<ProductsD[]>>;
}

export const MyContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [productList, setProductList] = useState<ProductsD[]>([]);

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

