import React from 'react'
import Products from '../Products'

export default function Cart() {
    return (
        <div>
            <h1 className="text-4xl mt-8 font-semibold max-w-screen-xl mx-auto px-4">Cart</h1>
            <Products />
        </div>
    )
}
