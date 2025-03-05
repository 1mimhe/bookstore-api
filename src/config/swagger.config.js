const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

function SwaggerConfig(app) {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
}

module.exports = {
    SwaggerConfig
}