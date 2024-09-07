"use client";

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading3Quarters, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { LoginApiResponseD } from '@/types';


// Define TypeScript types for form data
interface LoginFormInputs {
    username: string;
    password: string;
}

export default function LoginRoot() {
    const router = useRouter();
    // Initialize React Hook Form with TypeScript
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    expiresInMins: 30
                }),
            });

            const result: LoginApiResponseD = await response.json();
            console.log(result);
            setCookie('authToken', result.token);
            router.push("/");

            // Handle successful login here

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex-1 max-w-md h-92 border border-black/20 p-10 rounded-lg'>
                <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className={`border border-gray-200 outline-none focus:border-blue-500 rounded-md px-3 py-1 placeholder:text-sm ${errors.username ? 'border-red-500' : ''}`}
                            placeholder='Username'
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <div className='relative border border-gray-200 rounded-md px-3 py-1'>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className={`outline-none focus:border-blue-500 w-full placeholder:text-sm ${errors.password ? 'border-red-500' : ''}`}
                                placeholder='Password'
                                {...register('password', { required: 'Password is required' })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 flex items-center pr-3'
                            >
                                {showPassword ? <AiFillEyeInvisible className='text-gray-500' /> : <AiFillEye className='text-gray-500 text-xl' />}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>

                    <div className="mt-6 ml-auto">
                        <button
                            type="submit"
                            className={`w-20 h-9 flex items-center justify-center text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <AiOutlineLoading3Quarters className='animate-spin text-white text-xl' /> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
