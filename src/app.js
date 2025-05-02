const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { notFoundError, allErrorHandler, errorPreprocessor } = require("./middlewares/errorHandler.middleware");
const { SwaggerConfig } = require("./config/swagger.config");

require("./config/env.config"); // Config environment
const app = express();
require("./config/sequelize.config"); // Config DB connection
require("./db/models/associations"); // DB models associations
require("./config/db.sync"); // DB sync (for development environment)
const redisClient = require("./config/redis.config"); // Config Redis
const session = require("./config/session.config")(redisClient);

// Setup application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PRIVATE_KEY));
app.use(session);

// Routers
const allRouters = require("./routers/all.router");
app.use(allRouters);
SwaggerConfig(app); // Swagger configuration
app.use(notFoundError);
app.use(errorPreprocessor);
app.use(allErrorHandler);

// Setup Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}.`));