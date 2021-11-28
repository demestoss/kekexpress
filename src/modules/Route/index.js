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

  executeRouteCallbacks(request, response) {
    this.#callbacks.forEach((callback) => {
      if (response.isFinished()) return;
      callback(request, response);
    });
  }

  get url() {
    return this.#url;
  }
}

module.exports = Route;
