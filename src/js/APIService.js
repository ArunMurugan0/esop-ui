
export class APIService {
    constructor(apiURL, httpClient) {
        this.httpClient = httpClient
        this.apiURL = apiURL
    }

    get(route) {
        console.log(this.apiURL + route)
        return this.httpClient(this.apiURL + route, { headers: { Accept: "application/json" }, method: "GET" }).then(res => res.json())
    }
}