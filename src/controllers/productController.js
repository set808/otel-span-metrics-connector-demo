const products = [
    {
        id: 1,
        name: 'Senzu Beans',
        price: 500,
        description: 'Heals all wounds and restores your energy.',
        stock: 100
    },
    {
        id: 2,
        name: 'Capsule House',
        price: 100000,
        description: 'A small house in a capsule.',
        stock: 50
    },
    {
        id: 3,
        name: 'Capsule Car',
        price: 50000,
        description: 'A small car in a capsule.',
        stock: 20
    },
    {
        id: 4,
        name: 'Scouter',
        price: 1000,
        description: 'A device to measure power levels.',
        stock: 200
    },
    {
        id: 5,
        name: 'Dragonball Radar',
        price: 500,
        description: 'A device to locate the seven dragonballs.',
        stock: 10
    }
]

const getAllProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
};

const searchProducts = (req, res) => {
    const { query } = req.query;
    const filteredProducts = products.filter(p => p.name.includes(query) || p.description.includes(query));
    res.json(filteredProducts);
  };
  
  

module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
};
