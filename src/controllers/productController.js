const products = [
    {
        id: '1',
        name: 'Senzu Beans',
        price: 500,
        description: 'Heals all wounds and restores your energy.'
    },
    {
        id: '2',
        name: 'Capsule House',
        price: 100000,
        description: 'A small house in a capsule.'
    },
    {
        id: '3',
        name: 'Capsule Car',
        price: 50000,
        description: 'A small car in a capsule.'
    },
    {
        id: '4',
        name: 'Scouter',
        price: 1000,
        description: 'A device to measure power levels.'
    },
    {
        id: '5',
        name: 'Dragonball Radar',
        price: 500,
        description: 'A device to locate the seven dragonballs.'
    }
];

const getAllProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);

    // Introduce a random failure with a 40% probability
    const shouldFail = Math.random() < 0.4;

    if (shouldFail) {
        return res.status(500).send('Internal Server Error');
    }

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.json(product);
};

const searchProducts = (req, res) => {
    const { query } = req.query;
    const filteredProducts = products.filter(p => p.name.includes(query) || p.description.includes(query));
    const shouldTimeout = Math.random() < 0.4; // 20% probability of timeout

    if (shouldTimeout) {
        const timeoutTime = Math.floor(Math.random() * 3000) + 2000; // Random timeout between 2 to 5 seconds
        setTimeout(() => {
            res.status(504).send('Request Timeout');
        }, timeoutTime);
    } else {
        res.json(filteredProducts);
    }
};
  
  

module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
};
