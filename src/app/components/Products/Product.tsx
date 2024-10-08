import React, { useState } from 'react';
import { ProductsD } from '../../../../types';
import Image from 'next/image';
import { useData } from '@/app/context/DataProvider';
import { MdDelete, MdEdit } from 'react-icons/md';
import ConfirmModal from '../ConfirmModal';
import UpdateProduct from './UpdateProduct';

export default function Product({ product }: { product: ProductsD }) {
    const { id, title, images, price, rating } = product;
    const { productList, setProductList } = useData();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const openUpdateModal = () => setIsUpdateModalOpen(true);
    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const deleteProduct = async (id: number) => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE'
            });
            const product = await res.json();
            let filterProducts = productList.filter((i: any) => i.id !== product.id);
            setProductList(filterProducts);
            closeConfirmModal(); // Close confirm modal after deletion
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
            {isConfirmModalOpen && <ConfirmModal onClose={closeConfirmModal} onConfirm={() => deleteProduct(id)} />}
            {isUpdateModalOpen && <UpdateProduct onClose={closeUpdateModal} initialDetails={product} />}
        </>
    );
}
