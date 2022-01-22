export default class FetchWrapper {
  constructor(url) {
    this.url = url;
  }
  post(path, body) {
    return fetch(this.url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
