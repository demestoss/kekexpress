const UrlPart = require("./UrlPart");

class Url {
  #url;
  #splittedUrl;

  constructor(url) {
    this.#formatUrl(url);
    this.#splittedUrl = this.#url.split("/").map((part) => new UrlPart(part));
  }

  #deleteLastSlash(url) {
    return url && url.at(-1) === "/" ? url.slice(0, -1) : url;
  }

  #addFirstSlash(url) {
    return url.at(0) !== "/" ? `/${url}` : url;
  }

  #formatUrl(url) {
    this.#url = this.#deleteLastSlash(this.#addFirstSlash(url));
  }

  isEquals(other) {
    return this.urlString === other.urlString;
  }

  haveTheSamePartsLength(other) {
    return this.splittedUrl.length === other.splittedUrl.length;
  }

  haveTheSameParts(requestUrl) {
    if (!this.haveTheSamePartsLength(requestUrl)) return false;

    return this.splittedUrl.every((part, idx) => {
      const requestUrlPart = requestUrl.splittedUrl[idx];
      if (!requestUrlPart?.part && requestUrlPart.part !== "") return false;

      return part.isParameter() || part.isEquals(requestUrlPart);
    });
  }

  getUrlParams(requestUrl) {
    return this.splittedUrl.reduce((acc, part, idx) => {
      if (part.isParameter()) {
        const name = part.getParameterName();
        const value = requestUrl.splittedUrl[idx].part;

        acc[name] = value;
      }
      return acc;
    }, {});
  }

  startsWith(other) {
    return this.#url.startsWith(other.urlString);
  }

  concat(other) {
    return new Url(this.urlString + other.urlString);
  }

  get urlString() {
    return this.#url;
  }

  get splittedUrl() {
    return this.#splittedUrl;
  }
}

module.exports = Url;
