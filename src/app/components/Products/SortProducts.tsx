import { useData } from '@/app/context/DataProvider';
import React from 'react'

export default function SortProducts() {
    const { setProductList } = useData();

    const sortProducts = async (value: string) => {
        try {
            const res = await fetch(`https://dummyjson.com/products?sortBy=title&order=${value}`);
            const products = await res.json();
            // console.log(products);
            setProductList(products.products);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='mb-4'>
            <h6 className='text-base font-semibold mb-1'>Sort</h6>
            <select onChange={(e) => {
                sortProducts(e.target.value)
            }} className='border p-2 rounded-md outline-none'>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </div>
    )
}
