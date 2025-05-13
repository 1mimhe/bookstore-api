const autoBind = require("auto-bind");
const Profile = require("../db/models/profile.model");
const { addProfileValidator } = require("../validators/profile.validators");
const createHttpError = require("http-errors");

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
}

module.exports = new ProfileService();