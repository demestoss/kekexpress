class PersonService {
  #personRepository;

  constructor(personRepository) {
    this.#personRepository = personRepository;
  }

  getAllPersons() {
    return this.#personRepository.getAll();
  }

  createPerson(personDto) {
    return this.#personRepository.create(personDto);
  }

  getPersonById(personId) {
    return this.#personRepository.getById(personId);
  }

  updatePersonById(personId, personDto) {
    return this.#personRepository.update(personId, personDto);
  }

  deletePersonById(personId) {
    return this.#personRepository.delete(personId);
  }
}

module.exports = PersonService;
