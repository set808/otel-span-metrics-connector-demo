const express = require('express');
const indexRoutes = require('./routes/index');
const ProductRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use('/', indexRoutes);
app.use('/api', ProductRoutes);

//Middleware
app.use(logger);
app.use(errorHandler)

module.exports = app;
