const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { notFoundError, allErrorHandler } = require("./src/middlewares/errorHandler.middleware");
const { SwaggerConfig } = require("./src/configs/swagger.config");

require("./src/configs/env.config"); // Config environment
const app = express();
require("./src/configs/db.config"); // Config DB connection
require("./src/configs/model.config"); // Models configuration (For development mode)
const redisClient = require("./src/configs/redis.config"); // Config Redis
const session = require("./src/configs/session.config")(redisClient);

// Setup application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PRIVATE_KEY));
app.use(session);

// Routers
const allRouters = require("./src/routers/all.router");
app.use(allRouters);
SwaggerConfig(app); // Swagger configuration
app.use(notFoundError);
app.use(allErrorHandler);

// Setup Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}.`));