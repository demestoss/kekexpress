class ResponseWrapper {
  #response;

  constructor(response) {
    this.#response = response;
  }

  status(status) {
    this.#response.status(status);
    return this;
  }

  setHeader(key, value) {
    this.#response.setHeader(key, value);
    return this;
  }

  send(data) {
    this.#response.send(data);
  }

  json(data) {
    this.#response.json(data);
  }

  html(data) {
    this.#response.html(data);
  }

  isFinished() {
    return this.#response.isFinished();
  }

  get httpResponse() {
    return this.#response.httpResponse;
  }
}

module.exports = ResponseWrapper;
