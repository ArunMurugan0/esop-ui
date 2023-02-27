import { APIService } from "./APIService"

describe("API service", () => {
    it("should make a get request", async () => {
        const expectedResponsePayload = { message: "Hello World!!" }
        const fetchResponse = Promise.resolve({ json: function() { return expectedResponsePayload } })
        const fetchMock = jest.fn(() => fetchResponse)
        const apiService = new APIService("example.com", fetchMock)

        const actualResponseData = await apiService.get("/route")

        expect(actualResponseData).toEqual(expectedResponsePayload)
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith("example.com/route", {"headers": {"Accept": "application/json"}, "method": "GET"})
    })    
})