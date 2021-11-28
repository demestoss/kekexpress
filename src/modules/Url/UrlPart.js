class UrlPart {
  #part;

  constructor(part) {
    this.#part = part;
  }

  isParameter() {
    return this.#part[0] === "{" && this.#part.at(-1) === "}";
  }

  isEquals(other) {
    return this.part === other.part;
  }

  getParameterName() {
    return this.isParameter() ? this.part.slice(1, -1) : this.part;
  }

  get part() {
    return this.#part;
  }
}

module.exports = UrlPart;
