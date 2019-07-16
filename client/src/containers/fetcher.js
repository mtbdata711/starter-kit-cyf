export class Fetcher {
  constructor(url = '/api') {
    this.url = url
  }
  // Getter
  get getURL() {
    return this.url;
  }

  async fetchTermByPath(props) {
    const {
      match: { params }
    } = props;
    const url = `${this.url}/singleterm?term=${params.term}&topic=${
      params.topic
    }`;
    console.log(url);
    var response = await fetch(url);
    response = await response.json();
    return response;
  }
}
