describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')
    cy.intercept ('GET' , '**prod/notes').as('getNotes')

    cy.get('#email').type('alexandre_bsantos12@hotmail.com', { log: false })
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.wait('@getNotes')
  })

  it('CRUDs Notes', () => {
    // Inclusão
    cy.contains('Create a new note').click()
    cy.get('#content').type('My note')
    cy.contains('Create').click()

    cy.get('.list-group').should('contain', 'My note').click()

    // Edição
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible').click()

    // Exclusão
    cy.contains('Delete').click()
    cy.wait('@getNotes')

    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })

})
