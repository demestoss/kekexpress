const {
  RequiredValidationError,
  IncorrectTypeValidationError,
} = require("../error/errorTypes");

class Validator {
  _errors = [];

  _validateRequiredField(obj, fieldName) {
    if (!obj[fieldName]) {
      this._pushError(new RequiredValidationError(fieldName));
    }
  }

  _validateRequiredFields(obj, fields) {
    fields.forEach((field) => this._validateRequiredField(obj, field));
  }

  _validateFieldByType(obj, fieldName, fieldType) {
    if (typeof obj[fieldName] !== fieldType) {
      this._pushError(new IncorrectTypeValidationError(fieldName, fieldType));
    }
  }

  _pushError(error) {
    this._errors.push(error);
  }

  _clearErrors() {
    this._errors = [];
  }

  _isErrorsEmpty() {
    return !this._errors.length;
  }

  _throwErrors() {
    if (this._isErrorsEmpty()) return;

    const errors = this._errors;
    this._clearErrors();
    throw errors;
  }
}

module.exports = Validator;
