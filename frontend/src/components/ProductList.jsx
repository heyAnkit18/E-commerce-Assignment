import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]); // State for products
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        // Fetch products from the backend
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.data); // Set products from response
                } else {
                    console.error('Failed to fetch products');
                }
                setLoading(false); // Stop loading
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false); // Stop loading on error
            });
    }, []);

    if (loading) {
        return <div>Loading products...</div>; // Show loading message
    }

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}⭐</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

