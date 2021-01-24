/// <reference types="cypress" />

context('Actions', () => {
  // https://on.cypress.io/interacting-with-elements
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('switch to second slide', () => {
    cy.get('[data-testid=TourModalInfo] > div > h3').should('contain', 'First stop');
    cy.get('[data-testid=TourNodeButton]:nth-child(3)')
        .click();
    cy.get('[data-testid=TourModalInfo] > div > h3').should('contain', 'Second stop');
    cy.get('[data-testid=TourNodeButton]:nth-child(2)').click()
    cy.get('[data-testid=TourModalInfo] > div > h3').should('contain', 'First stop');
  })
})
