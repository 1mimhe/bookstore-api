const autoBind = require("auto-bind");
const Profile = require("../db/models/profile.model");
const { addProfileValidator, editProfileValidator } = require("../validators/profile.validators");
const createHttpError = require("http-errors");
const otherMessages = require("../constants/other.messages");

class ProfileService {
  #Profile;

  constructor() {
    autoBind(this);

    this.#Profile = Profile;
  }

  async addProfile(profileDTO) {    
    const validate = addProfileValidator();    
    const isValid = validate(profileDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    return this.#Profile.create(profileDTO);
  }
  
  async getProfileById(id) {
    const profile = await this.#Profile.findByPk(id);
    if (!profile) throw new createHttpError.NotFound(otherMessages.ProfileNotFound);
    return profile;
  }

  async editProfile(id, profileDTO) {
    const validate = editProfileValidator();    
    const isValid = validate(profileDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    const profile = await this.getProfileById(id);
    Object.keys(profileDTO).forEach(key => profile[key] = profileDTO[key]);
    await profile.save();
  }

  async deleteProfile(id) {
    return this.#Profile.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new ProfileService();