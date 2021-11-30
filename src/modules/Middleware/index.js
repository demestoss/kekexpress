const { NextFunctionCommand } = require("../utils");

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
    const next = () => {
      throw new NextFunctionCommand();
    };

    for (const callback of this.#middlewares) {
      if (response.isFinished()) return;
      try {
        await callback(request, response, next);
      } catch (e) {
        if (!(e instanceof NextFunctionCommand)) {
          // if next() callback executed, we go to the next callback
          throw e;
        }
      }
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
