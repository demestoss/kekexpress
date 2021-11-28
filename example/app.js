const { Server } = require("kekexpress");
const personRouter = require("./modules/person/person.routes");
const notFoundHandler = require("./modules/notFound");
const errorHandler = require("./modules/error");

class App {
  #kexpressApp;

  constructor() {
    this.#kexpressApp = new Server();
    this.#applyRouters();
    this.#applyHandlers();
  }

  #applyRouters() {
    this.#kexpressApp.use(personRouter());
  }

  #applyHandlers() {
    this.#kexpressApp.notFound(notFoundHandler);
    this.#kexpressApp.error(errorHandler);
  }

  run(port) {
    this.#kexpressApp.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  }

  stop() {
    this.#kexpressApp.close();
  }

  get httpServer() {
    return this.#kexpressApp.httpServer;
  }
}

module.exports = App;
