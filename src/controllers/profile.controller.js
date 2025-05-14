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

  async getProfileById(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await this.#Service.getProfileById(id);
      return res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { firstName, lastName, slug, biography, dateOfBirth, dateOfDeath } = req.body;
  
      const editedProfile = await this.#Service.editProfile(id, { firstName, lastName, slug, biography, dateOfBirth, dateOfDeath });
      return res.status(200).json(editedProfile);
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req, res, next) {
    try {
      const { id } = req.params;
      const isProfileDeleted = await this.#Service.deleteProfile(id) ? true : false;
      return res.status(200).json({
        success: isProfileDeleted
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();