import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../api/products";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Fetched products:", response);
            if (Array.isArray(response)) {
                setProducts(response);
            } else {
                console.error("Fetched data is not an array");
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const goToAddProducts = () => {
        navigate('/add-product');
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await deleteProduct(productId);
                if (response.success) {
                    setProducts(products.filter(product => product.product_id !== productId));
                    setMessage({ text: "Product deleted successfully!", type: "success" });
                } else {
                    setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                }
            } catch (error) {
                setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                console.error("Failed to delete product", error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(
                currentProduct.product_id,
                currentProduct.product_name,
                currentProduct.quantity,
                currentProduct.unit,
                currentProduct.price
            );
            console.log("Update response:", response);
            if (response.success) {
                setProducts(products.map(product =>
                    product.product_id === currentProduct.product_id ? currentProduct : product
                ));
                setIsModalOpen(false);
                setMessage({ text: "Product updated successfully!", type: "success" });
                getAllProducts();
            } else {
                setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            console.error("Failed to update product", error);
        }
    };

    const openUpdateModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            <div className="max-w-10xl mx-auto bg-black">
                <h1 className="text-5xl font-bold text-center mb-6 text-white">INVENTORY PRODUCT DASHBOARD</h1>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-md">
                        <thead className="bg-blue-500 text-black">
                            <tr>
                                <th className="px-4 py-2">Product ID</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Unit</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-blue-100" : "bg-white"}>
                                    <td className="border px-4 py-2">{product.product_id}</td>
                                    <td className="border px-4 py-2">{product.product_name}</td>
                                    <td className="border px-4 py-2">{product.quantity}</td>
                                    <td className="border px-4 py-2">{product.unit}</td>
                                    <td className="border px-4 py-2">{product.price}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => openUpdateModal(product)}
                                            className="mr-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.product_id)}
                                            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-purple-200 p-8 rounded-md shadow-md w-1/3">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        value={currentProduct.product_name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, product_name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        value={currentProduct.quantity}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Unit</label>
                                    <input
                                        type="text"
                                        value={currentProduct.unit}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, unit: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={currentProduct.price}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none mr-2"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        className="px-7 py-2 bg-blue-500 text-black rounded-md hover:bg-gray-500 focus:outline-none"
                        onClick={goToAddProducts}
                    >
                        Add Product
                    </button>
               
                </div>
            </div>
        </div>
    );
};

export default Inventory;
