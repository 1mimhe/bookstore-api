const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

function SwaggerConfig(app) {
    app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = {
    SwaggerConfig
}