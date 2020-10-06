/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  });

  // https://on.cypress.io/interacting-with-elements

  it('switch to second slide', () => {
    let old = cy.get('.TourModal__InfoArea-d3fmn8-0 > h3:nth-child(1)').text;
    cy.get('button.TourButton__TourNodeButton-sc-1rp18h9-0:nth-child(3)')
        .click();
    cy.get('.TourModal__InfoArea-d3fmn8-0 > h3:nth-child(1)').should('not.have.value', old);
  })
})
