const { hits } = require('../../fixtures/stories')

describe('Slow tests bad practice - use the API to test the frontend', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')

    cy.get('input[type="text"]')
      .should('be.visible')
      .as('searchField')
      .clear()
  })

  it('searches by typing and hitting enter', () => {
    cy.get('@searchField')
      .type('frontend testing{enter}')


    cy.get('.table-row')
      .should('have.length', hits.length)
  })
})
