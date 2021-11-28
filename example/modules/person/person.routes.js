const { Router } = require("kekexpress");
const PersonController = require("./person.controller");
const PersonValidator = require("./person.validator");
const PersonRepository = require("./person.repository");
const PersonService = require("./person.service");

module.exports = () => {
  const router = new Router("/person");

  // FIXME: This chaos could be resolved using IoC Container
  const personRepository = new PersonRepository();
  const personService = new PersonService(personRepository);
  const personController = new PersonController(personService);

  router.get("/", personController.getPersons);
  router.post("/", PersonValidator.validateDto, personController.createPerson);
  router.get(
    "/{personId}",
    PersonValidator.validateIdParameter,
    personController.getPersonById
  );
  router.put(
    "/{personId}",
    PersonValidator.validateIdParameter,
    PersonValidator.validateDto,
    personController.updatePerson
  );
  router.delete(
    "/{personId}",
    PersonValidator.validateIdParameter,
    personController.deletePerson
  );

  return router;
};
