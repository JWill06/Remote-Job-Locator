describe('Footer tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://remotive.com/api/remote-jobs', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('jobApi');
    cy.visit('http://localhost:3000/')
  })
  it('Contains Header image', () => {
    cy.get('.headerWrapper img').should('exist')
  })
  it('Should contain main text', () => {
    cy.get('.headerWrapper h1').should('contain', 'Find your next remote job!')
  })
  it('Should contain two clickable links', () => {
    cy.get('.headerWrapper .postingLinks .link1').should('be.visible')
    cy.get('.headerWrapper .postingLinks .link2').should('be.visible')
  })
  it('Navigates to All Postings page', () => {
    cy.visit('http://localhost:3000/Postings');
    cy.get('.headerWrapper .postingLinks .link1').click(); 
    cy.url().should('include', '/postings')
  });
  it('Should navigate to the saved postings page', () => {
    cy.visit('http://localhost:3000/SavedPostings');
    cy.get('.headerWrapper .postingLinks .link2').click();
    cy.url().should('include', '/SavedPostings');
  })
})