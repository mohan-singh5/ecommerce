import React, { useState } from 'react';
import Image from 'next/image';
import { MdDelete, MdEdit } from 'react-icons/md';
import ConfirmModal from '../ConfirmModal';
import UpdateProduct from './UpdateProduct';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/lib/features/products/productSlice';
import { ProductsListD } from '@/lib/features/products/productTypes';

export default function Product({ product }: { product: ProductsListD }) {
    const { id, title, images, price, rating } = product;
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const openUpdateModal = () => setIsUpdateModalOpen(true);
    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const removeProduct = async (id: number) => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE'
            });
            const product = await res.json();
            dispatch(deleteProduct(product));
            closeConfirmModal();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{price}</td>
                <td>{rating}</td>
                <td>
                    {
                        images ? <Image className='mx-auto w-12 h-12 object-scale-down' src={images[0]} alt={title} width={50} height={50} /> : <span className='h-12 inline-flex items-center justify-center'>No image</span>
                    }
                </td>
                <td className=''>
                    <span className='w-8 h-8 rounded-md bg-gray-200 text-red-500 inline-flex items-center justify-center cursor-pointer' onClick={() => openConfirmModal()}>
                        <MdDelete className='text-xl' />
                    </span>
                    <span className='w-8 h-8 ml-4 rounded-md bg-gray-200 text-green-500 inline-flex items-center justify-center cursor-pointer' onClick={() => openUpdateModal()}>
                        <MdEdit className='text-xl' />
                    </span>
                </td>
            </tr>
            {isConfirmModalOpen && <ConfirmModal onClose={closeConfirmModal} onConfirm={() => removeProduct(id)} />}
            {isUpdateModalOpen && <UpdateProduct onClose={closeUpdateModal} initialDetails={product} />}
        </>
    );
}
