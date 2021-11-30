const Router = require("../Router");

class RouterList {
  #routers = [];

  isEmpty() {
    return !this.#routers.length;
  }

  push(router) {
    if (!(router instanceof Router)) {
      throw new Error(
        "Router has invalid type. It should be Router class type"
      );
    }

    this.#routers.push(router);
  }

  findRouteByRequest(request) {
    if (this.isEmpty()) return null;

    for (let i = 0; i < this.#routers.length; ++i) {
      const findedRoute = this.#routers.at(i).findRouteByRequest(request);

      if (findedRoute) {
        return findedRoute;
      }
    }

    return null;
  }
}

module.exports = RouterList;
