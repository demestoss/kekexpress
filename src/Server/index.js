const http = require("http");
const Response = require("../Response");
const Request = require("../Request");
const Router = require("../modules/Router");
const RouterList = require("../modules/Router/RouterList");
const Middleware = require("../modules/Middleware");
const RequestWrapper = require("../Request/RequestWrapper");
const ResponseWrapper = require("../Response/ResponseWrapper");
const { HOST } = require("../config");

class Server {
  #server;
  #routerList = new RouterList();
  #defaultRouter = new Router("");
  #middlewares = new Middleware();
  #notFoundCallback = null;
  #errorCallback = null;

  constructor() {
    this.#server = http.createServer(this.#requestLoop.bind(this));
  }

  get httpServer() {
    return this.#server;
  }

  listen(port, callback) {
    this.#server.listen(port, HOST, callback);
  }

  close(callback) {
    this.#server.close(callback);
  }

  middleware(...args) {
    this.#middlewares.push(...args);
  }

  use(router) {
    this.#routerList.push(router);
  }

  get(url, ...args) {
    this.#defaultRouter.get(url, ...args);
  }

  post(url, ...args) {
    this.#defaultRouter.post(url, ...args);
  }

  put(url, ...args) {
    this.#defaultRouter.put(url, ...args);
  }

  patch(url, ...args) {
    this.#defaultRouter.patch(url, ...args);
  }

  delete(url, ...args) {
    this.#defaultRouter.delete(url, ...args);
  }

  notFound(callback) {
    this.#notFoundCallback = callback;
  }

  error(callback) {
    this.#errorCallback = callback;
  }

  #routeNotFound(request, response) {
    if (this.#notFoundCallback) {
      this.#notFoundCallback(request, response);
    } else {
      throw new Error("Route was not found");
    }
  }

  #applicationError(request, response, error) {
    if (this.#errorCallback) {
      this.#errorCallback(request, response, error);
    } else {
      throw error;
    }
  }

  #findRoute(request) {
    return (
      this.#routerList.findRouteByRequest(request) ||
      this.#defaultRouter.findRouteByRequest(request)
    );
  }

  async #requestLoop(req, res) {
    const response = new Response(res);
    const request = new Request(req);
    const wrappedRequest = new RequestWrapper(request);
    const wrappedResponse = new ResponseWrapper(response);

    try {
      const data = this.#findRoute(request);
      if (!data) return this.#routeNotFound(wrappedRequest, wrappedResponse);

      const { route, middlewares, fullUrl } = data;
      await request.parseBody();
      request.parseParams(fullUrl);

      await this.#middlewares.execute(wrappedRequest, wrappedResponse);
      await middlewares.execute(wrappedRequest, wrappedResponse);
      await route.executeRouteCallbacks(wrappedRequest, wrappedResponse);
    } catch (e) {
      this.#applicationError(wrappedRequest, wrappedResponse, e);
    }
  }
}

module.exports = Server;
