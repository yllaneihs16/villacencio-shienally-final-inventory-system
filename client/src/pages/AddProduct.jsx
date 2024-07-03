import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addProducts } from "../api/products";

const AddProduct = () => {
    const [product_id, setProductId] = useState('');
    const [product_name, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleAdd = async () => {
        const response = await addProducts(product_id, product_name, quantity, unit, price);

        if (response.exist) {
            setErrorMessage('Product already exists.');
            setShowMessage(true);
        } else if (response.success) {
            setErrorMessage('Product added successfully.');
            setShowMessage(true);

            // Clear the input fields
            setProductId('');
            setProductName('');
            setQuantity('');
            setUnit('');
            setPrice('');
        } else {
            setErrorMessage('Failed to add product.');
            setShowMessage(true);
        }

        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    }

    const redirectToInventory = () => {
        navigate('/inventory');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-900 text-gray-200">
            <div className="p-8 max-w-md w-full bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6">ADD PRODUCT</h2>

                {showMessage && (
                    <div className="bg-red-500 text-white rounded-md p-3 mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                <form className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="product_id" className="text-lg text-gray-300">Product ID</label>
                        <input
                            id="product_id"
                            type="text"
                            value={product_id}
                            onChange={(e) => setProductId(e.target.value)}
                            className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label htmlFor="product_name" className="text-lg text-gray-300">Product Name</label>
                        <input
                            id="product_name"
                            type="text"
                            value={product_name}
                            onChange={(e) => setProductName(e.target.value)}
                            className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label htmlFor="quantity" className="text-lg text-gray-300">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label htmlFor="unit" className="text-lg text-gray-300">Unit</label>
                        <input
                            id="unit"
                            type="text"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label htmlFor="price" className="text-lg text-gray-300">Price</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={redirectToInventory}
                            className="py-2 px-4 bg-gray-700 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                        >
                            Go to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
