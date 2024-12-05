import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                const product = response.data.find(p => p.id === parseInt(id));
                setProduct(product);
            })
            .catch(error => console.error(error));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <button onClick={() => navigate('/cart')}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
