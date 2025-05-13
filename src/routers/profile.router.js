const { Router } = require("express");
const { addProfile } = require("../controllers/profile.controller");
const profileRouter = Router();

profileRouter.post('', addProfile);

module.exports = profileRouter;