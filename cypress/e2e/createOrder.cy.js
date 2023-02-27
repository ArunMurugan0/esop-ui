describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6001/createOrder.html')
  })

  it("should make the buy request", (done) => {
    cy.get("#username").type("Arun")
    cy.get("#order-quantity").type("10")
    cy.get("#order-price").type("12")
    cy.get("#order-type").select("BUY")
    cy.get("#esop-type").should('not.be.visible')

    cy.fixture("buyOrder").then((res) => {
      cy.intercept("POST", "http://127.0.0.1:8080/user/Arun/order", res).as('createOrderRequest')
    })

    cy.get("#submit").click()
    cy.wait("@createOrderRequest")
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal("Order Placed Successfully!")
      done()
    })
  })

  it("should make the sell request", (done) => {
    cy.get("#username").type("Arun")
    cy.get("#order-quantity").type("10")
    cy.get("#order-price").type("12")
    cy.get("#order-type").select("SELL")
    cy.get("#esop-type").should('be.visible').select("PERFORMANCE")

    cy.fixture("sellOrder").then((res) => {
      cy.intercept("POST", "http://127.0.0.1:8080/user/Arun/order", res).as('createOrderRequest')
    })

    cy.get("#submit").click()
    cy.wait("@createOrderRequest")
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal("Order Placed Successfully!")
      done()
    })
  })
})