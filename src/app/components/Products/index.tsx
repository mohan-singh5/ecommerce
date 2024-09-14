"use client"

import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Product from './Product';
import SortProducts from './SortProducts';
import AddProduct from './AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { applyCoupon, setproducts } from '@/lib/features/products/productSlice';
import { fetchProducts } from '@/lib/features/products/productApi';

const couponCode = "COUP1234";

export default function Products() {
    // const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { products, loading } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();

    // const getAllProducts = async () => {
    //     try {
    //         setLoading(true);
    //         const res = await fetch('https://dummyjson.com/products');
    //         const products = await res.json();
    //         // dispatch(setproducts(products));
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        // getAllProducts();
        dispatch(fetchProducts());
    }, [dispatch])

    useEffect(() => {
        let total = 0;
        products.products?.forEach((i) => {
            total += Number(i.price);
        })
        setTotalPrice(Number(total.toFixed(0)))
    }, [products]);

    const handleCouponApply = () => {
        dispatch(applyCoupon(coupon));
    }

    return (
        <>
            <div className='max-w-screen-xl mx-auto px-4 mt-5 mb-10'>
                <h2 className='text-2xl font-semibold mb-2'>Products List</h2>
                <div className='flex items-center gap-5 justify-between'>
                    <div>
                        <button className='bg-blue-500 px-6 py-2 rounded-md outline-none text-white' onClick={() => openModal()}>Add</button>
                    </div>
                    <SortProducts />
                </div>
                {
                    loading ?
                        <div className='w-full h-52 flex justify-center items-center'>
                            <AiOutlineLoading3Quarters className='text-4xl animate-spin text-blue-500' />
                        </div> :
                        <>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Rating</th>
                                        <th>Image</th>
                                        <th>Operation</th>
                                    </tr>
                                    {
                                        products?.products?.length > 0 && products.products.map((product) => {
                                            return (
                                                <Product key={product.id} product={product} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className='flex items-center gap-5 justify-between mt-4 text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="" className='mr-3 text-sm font-medium'>
                                        Enter Coupon (COUP1234)
                                    </label>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="text"
                                            className='border border-gray-300 rounded-md px-3 py-1 outline-none placeholder:text-sm'
                                            placeholder='Enter Coupon'
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                        />
                                        <button
                                            className='bg-blue-500 px-4 py-1 rounded-md text-white'
                                            onClick={handleCouponApply}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <span className='font-semibold'>Total Amount:</span> {totalPrice}
                                </div>
                            </div>
                        </>
                }
            </div>
            {isModalOpen && <AddProduct onClose={closeModal} />}
        </>
    )
}
