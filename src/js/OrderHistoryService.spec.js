import { APIService } from "./APIService";
import { OrderHistoryService } from "./OrderHistoryService";

jest.mock("./APIService.js")

describe("OrderHistoryService", () => {
    it("should fetch Order History", async () => {
        const mockedAPIService = new APIService()
        const expectedResponseData = [ "data" ]
        mockedAPIService.get.mockImplementation(() => Promise.resolve(expectedResponseData));
        const orderHistoryService = new OrderHistoryService(mockedAPIService)
        
        const actualResponseData = await orderHistoryService.getHistory("Arun")
        
        expect(actualResponseData).toBe(expectedResponseData)
        expect(mockedAPIService.get).toHaveBeenCalledTimes(1)
        expect(mockedAPIService.get).toHaveBeenCalledWith("user/Arun/orderHistory")
    })    
})