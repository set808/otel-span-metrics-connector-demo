const express = require('express');
const app = require('./src/app');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Capsule Corp!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
