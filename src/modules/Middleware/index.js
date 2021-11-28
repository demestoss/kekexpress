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

  async execute(request, response) {
    for (const callback of this.#middlewares) {
      if (response.isFinished()) return;
      await callback(request, response);
    }
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
