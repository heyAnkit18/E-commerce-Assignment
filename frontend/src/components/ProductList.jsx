import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.data); 
                } else {
                    console.error('Failed to fetch products');
                }
                setLoading(false); 
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false); 
            });
    }, []);

    if (loading) {
        return <div>Loading products...</div>; 
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

