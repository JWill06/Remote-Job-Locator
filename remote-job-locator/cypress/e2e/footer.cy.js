describe('Footer tests', () => {
  it('Contains footer content', () => {
    cy.visit('http://localhost:3000')
    cy.get('.footerWrapper .footerText').should('contain','Est. 2024')
  })
})