const { Router } = require("express");
const { addProfile, getProfileById, editProfile, deleteProfile } = require("../controllers/profile.controller");
const profileRouter = Router();

profileRouter.post('', addProfile);
profileRouter.get('/:id', getProfileById);
profileRouter.patch('/:id', editProfile);
profileRouter.delete('/:id', deleteProfile);

module.exports = profileRouter;