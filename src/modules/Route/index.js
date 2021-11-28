const Url = require("../Url");

class Route {
  #url;
  #method;
  #callbacks;

  constructor(urlString, method, callbacks) {
    this.#url = new Url(urlString);
    this.#method = method;
    this.#callbacks = callbacks;
  }

  isRouteMatches(request, prefix) {
    const fullUrl = prefix.concat(this.#url);
    if (this.#method !== request.method) return false;
    if (fullUrl.isEquals(request.url)) return true;

    return fullUrl.haveTheSameParts(request.url);
  }

  async executeRouteCallbacks(request, response) {
    for (const callback of this.#callbacks) {
      if (response.isFinished()) return;
      await callback(request, response);
    }
  }

  get url() {
    return this.#url;
  }
}

module.exports = Route;
