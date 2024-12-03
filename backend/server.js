const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = require('./data.json');

app.get('/products', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: products
    });
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.status(200).json({
            success: true,
            message: `Product with ID ${productId} fetched successfully!`,
            data: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found.`
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

