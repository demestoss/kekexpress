class RequestWrapper {
  #request;

  constructor(request) {
    this.#request = request;
  }

  get url() {
    return this.#request.url.urlString;
  }

  get method() {
    return this.#request.method;
  }

  get params() {
    return this.#request.params;
  }

  get query() {
    return this.#request.query;
  }

  get body() {
    return this.#request.body;
  }

  get httpRequest() {
    return this.#request.httpRequest;
  }
}

module.exports = RequestWrapper;
