const autoBind = require("auto-bind");
const profileService = require("../services/profile.service");

class ProfileController {
  #Service;

  constructor() {
    autoBind(this);

    this.#Service = profileService;
  }

  async addProfile(req, res, next) {
    try {
      let { firstName, lastName, slug, biography, dateOfBirth, dateOfDeath } = req.body;
      if (!slug) slug = `${firstName} ${lastName}`;

      const newProfile = await this.#Service.addProfile({ firstName, lastName, slug, biography, dateOfBirth, dateOfDeath });
      return res.status(201).json(newProfile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();