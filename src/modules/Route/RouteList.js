class RouteList {
  #routes = [];

  add(route) {
    this.#routes.push(route);
  }

  findRouteByRequest(request, prefix) {
    return this.#routes.find((route) => route.isRouteMatches(request, prefix));
  }
}

module.exports = RouteList;
