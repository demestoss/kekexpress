const Url = require("../Url");
const { NextFunctionCommand } = require("../utils");

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
    const next = () => {
      throw new NextFunctionCommand();
    };

    for (const callback of this.#callbacks) {
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

  get url() {
    return this.#url;
  }
}

module.exports = Route;
