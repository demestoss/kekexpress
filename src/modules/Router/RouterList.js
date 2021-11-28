const Url = require("../Url");

class RouterList {
  #routers = [];

  isEmpty() {
    return !this.#routers.length;
  }

  push(router) {
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
