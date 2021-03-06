export default class FetchWrapper {
  constructor(url) {
    this.url = url;
  }

  async _sendRequest(path, method, body) {
    const response = await fetch(this.url + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
    return [response.status, data];
  }

  post(path, body) {
    return this._sendRequest(path, "POST", body);
  }
}
