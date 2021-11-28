const { validate: uuidValidate } = require("uuid");
const Validator = require("../validator");
const { IncorrectTypeValidationError } = require("../error/errorTypes");

// TODO: rethink validator logic. Need to add config for routes
class PersonValidator extends Validator {
  validateIdParameter = (req) => {
    const { personId } = req.params;
    if (!uuidValidate(personId)) {
      this._pushError(new IncorrectTypeValidationError("personId", "uuid"));
    }

    this._throwErrors();
  };

  validateDto = (req) => {
    const personDto = req.body;

    this._validateRequiredFields(personDto, ["name", "age", "hobbies"]);
    this._throwErrors();

    this._validateFieldByType(personDto, "name", "string");
    this._validateFieldByType(personDto, "age", "number");

    if (
      Array.isArray(personDto.hobbies) &&
      !personDto.hobbies.every((el) => typeof el === "string")
    ) {
      this._pushError(
        new IncorrectTypeValidationError("hobbies", "array of strings")
      );
    }
    this._throwErrors();
  };
}

module.exports = new PersonValidator();
