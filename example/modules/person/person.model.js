const { v4: uuidv4 } = require("uuid");

class PersonModel {
  create(personDto) {
    const { name, age, hobbies } = personDto;
    return {
      id: uuidv4(),
      name,
      age,
      hobbies,
    };
  }

  update(personModel, personDto) {
    const { name, age, hobbies } = personDto;
    return {
      id: personModel.id,
      name,
      age,
      hobbies,
    };
  }
}

module.exports = new PersonModel();
