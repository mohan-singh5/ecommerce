"use client"

import { useData } from '@/app/context/DataProvider';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Product from './Product';
import SortProducts from './SortProducts';
import AddProduct from './AddProduct';

const couponCode = "COUP1234"

export default function Products() {
    const { productList, setProductList } = useData();
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getAllProducst = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://dummyjson.com/products');
            const products = await res.json();
            console.log(products);
            setProductList(products.products);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducst();
    }, [])

    useEffect(() => {
        let total = 0;
        productList.forEach((i) => {
            total += Number(i.price);
        })
        setTotalPrice(Number(total.toFixed(0)))
    }, [productList]);

    const handleCouponApply = () => {
        if (!coupon) {
            alert("Please enter coupon code");
            return;
        }
        if (couponApplied) {
            alert("Coupon code is already applied");
            return;
        }

        let discount = 0;

        if (coupon.trim() === couponCode) {
            discount = 0.50; // 50%
            const discountedAmount = totalPrice * (1 - discount);
            setTotalPrice(Number(discountedAmount.toFixed(0)));
            setCouponApplied(true);
            setCoupon('');
        } else {
            alert("Please enter correct coupon code")
        }
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
                                        productList.map((product) => {
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
