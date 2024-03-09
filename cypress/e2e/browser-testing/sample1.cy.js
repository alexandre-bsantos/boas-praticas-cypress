describe('Browser testing bad practice - anchor href', () => {
  beforeEach(() => {
    cy.visit('https://notes-serverless-app.com')
  })

  it('directs the user to the login page when clicking the login link', () => {
    cy.contains('.nav a', 'Login').should('not.have.attr', 'target').and('have.attr', 'href', '/login')

  })
})
