class Middleware {
  #middlewares = [];

  constructor(middlewares = []) {
    Middleware.validateMiddlewares(middlewares);
    this.#middlewares = middlewares;
  }

  static validateMiddlewares(middlewares) {
    if (!middlewares.every((arg) => arg instanceof Function))
      throw new Error("Middleware must be a function");
  }

  push(...args) {
    Middleware.validateMiddlewares(args);
    this.#middlewares.push(...args);
  }

  execute(request, response) {
    this.#middlewares.forEach((callback) => {
      if (response.isFinished()) return;
      callback(request, response);
    });
  }

  glue(other) {
    const list = [...this.list, ...other.list];
    return new Middleware(list);
  }

  get list() {
    return this.#middlewares;
  }
}

module.exports = Middleware;
