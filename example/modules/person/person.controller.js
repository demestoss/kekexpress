const { NotFoundError } = require("../error/errorTypes");

class PersonController {
  #personService;

  constructor(personService) {
    this.#personService = personService;
  }

  getPersons = (req, res) => {
    const persons = this.#personService.getAllPersons();
    res.status(200).json(persons);
  };

  createPerson = (req, res) => {
    const personDto = req.body;
    const personModel = this.#personService.createPerson(personDto);
    res.status(200).json(personModel);
  };

  getPersonById = (req, res) => {
    const { personId } = req.params;
    const person = this.#personService.getPersonById(personId);

    if (!person) throw new NotFoundError("Person");

    res.status(200).json(person);
  };

  updatePerson = (req, res) => {
    const { personId } = req.params;
    const personDto = req.body;
    const personModel = this.#personService.updatePersonById(
      personId,
      personDto
    );

    if (!personModel) throw new NotFoundError("Person");

    res.status(200).json(personModel);
  };

  deletePerson = (req, res) => {
    const { personId } = req.params;
    const isDeleted = this.#personService.deletePersonById(personId);

    if (!isDeleted) throw new NotFoundError("Person");

    res.status(204).json();
  };
}

module.exports = PersonController;
