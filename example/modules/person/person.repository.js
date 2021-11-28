const PersonModel = require("./person.model");

class PersonRepository {
  #persons = [];

  #getIndexById(id) {
    return this.#persons.findIndex((person) => person.id === id);
  }

  getAll() {
    return this.#persons;
  }

  create(personDto) {
    const person = PersonModel.create(personDto);
    this.#persons.push(person);
    return person;
  }

  getById(id) {
    const idx = this.#getIndexById(id);
    return idx !== -1 && this.#persons[idx];
  }

  update(id, personDto) {
    const personIdx = this.#getIndexById(id);
    if (personIdx === -1) return null;

    const newPersonModel = PersonModel.update(
      this.#persons[personIdx],
      personDto
    );
    this.#persons[personIdx] = newPersonModel;
    return newPersonModel;
  }

  delete(id) {
    const personIdx = this.#getIndexById(id);
    if (personIdx === -1) return false;

    this.#persons.splice(personIdx, 1);
    return true;
  }
}

module.exports = PersonRepository;
