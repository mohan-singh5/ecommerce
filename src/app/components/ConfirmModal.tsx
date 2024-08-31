import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmModal({ onClose, onConfirm }: ConfirmModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle click outside the modal
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Call the onClose function to close the modal
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
        onClose();
    };

    useEffect(() => {
        // Add event listener to detect clicks outside the modal
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="relative z-10 w-full max-w-md p-6 bg-white border border-white rounded-lg shadow-lg"
                ref={modalRef}
            >
                <h6 className="mb-6 text-lg font-medium">Are you sure you want to delete this product?</h6>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="w-20 h-9 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        className={`w-20 h-9 flex items-center justify-center text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        {isLoading ? <AiOutlineLoading3Quarters className='animate-spin text-white text-xl' /> : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}
