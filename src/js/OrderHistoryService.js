
export class OrderHistoryService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    async getHistory(userName) {
        return this.apiService.get(`user/${userName}/orderHistory`);
    }
}
