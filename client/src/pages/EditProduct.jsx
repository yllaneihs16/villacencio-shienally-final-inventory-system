import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/products"; // Adjust the import path as necessary

const EditProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_id: '',
        product_name: '',
        quantity: '',
        unit: '',
        price: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(product_id);
            setProduct(productData);
        }

        fetchProduct();
    }, [product_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProduct(product_id, product);
        navigate('/inventory'); // Redirect to the inventory page after updating
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="product_id"
                    value={product.product_id}
                    onChange={handleChange}
                    placeholder="Product ID"
                    disabled
                />
                <input
                    type="text"
                    name="product_name"
                    value={product.product_name}
                    onChange={handleChange}
                    placeholder="Product Name"
                />
                <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                />
                <input
                    type="text"
                    name="unit"
                    value={product.unit}
                    onChange={handleChange}
                    placeholder="Unit"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProduct;
