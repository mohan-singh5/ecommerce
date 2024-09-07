import { addProduct } from '@/lib/features/products/productSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from 'react-redux';

interface ConfirmModalProps {
    onClose: () => void;
}

interface FormData {
    title: string;
    price: string;
    rating: number; // Changed to number for validation
}

export default function AddProduct({ onClose }: ConfirmModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const dispatch = useDispatch();

    // Function to handle click outside the modal
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Call the onClose function to close the modal
        }
    };

    useEffect(() => {
        // Add event listener to detect clicks outside the modal
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle form submission
    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            // setProductList(prevList => [result, ...prevList])
            dispatch(addProduct(result));
            setIsLoading(false);
            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error adding product:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="relative z-10 w-full max-w-md p-6 bg-white border border-white rounded-lg shadow-lg"
                ref={modalRef}
            >
                <h6 className="mb-6 text-lg font-medium">Add new product</h6>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className={`border border-gray-200 outline-none focus:border-blue-500 rounded-md px-3 py-1 placeholder:text-sm ${errors.title ? 'border-red-500' : ''}`}
                            placeholder='Enter title'
                        />
                        {errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            {...register('price', { required: 'Price is required' })}
                            className={`border border-gray-200 outline-none focus:border-blue-500 rounded-md px-3 py-1 placeholder:text-sm ${errors.price ? 'border-red-500' : ''}`}
                            placeholder='Enter price'
                        />
                        {errors.price && <span className='text-red-500 text-sm'>{errors.price.message}</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="rating">Rating</label>
                        <input
                            id="rating"
                            type="number"
                            {...register('rating', {
                                required: 'Rating is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Rating must be at least 1' },
                                max: { value: 5, message: 'Rating cannot be more than 5' },
                            })}
                            className={`border border-gray-200 outline-none focus:border-blue-500 rounded-md px-3 py-1 placeholder:text-sm ${errors.rating ? 'border-red-500' : ''}`}
                            placeholder='Enter Rating'
                        />
                        {errors.rating && <span className='text-red-500 text-sm'>{errors.rating.message}</span>}
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-20 h-9 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-20 h-9 flex items-center justify-center text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? <AiOutlineLoading3Quarters className='animate-spin text-white text-xl' /> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
