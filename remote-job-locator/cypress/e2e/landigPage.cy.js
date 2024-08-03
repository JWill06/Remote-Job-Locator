describe('Landing page tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://remotive.com/api/remote-jobs', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('jobApi');
    cy.visit('http://localhost:3000/')
  })
  it('Should cotain the main page content', () => {
    cy.get('.landingPageWrapper .mainContent').should('exist')
    .and('contain', 'Looking for your next or first remote job?')
    .and('contain', 'Click below to get started!');
  })
  it('Should contain a button', () => {
    cy.get('.landingPageWrapper .mainContent .postingsButton').should('exist')
  })
  it('Should have a clickable button that takes you to the postings', () => {
    cy.get('.landingPageWrapper .mainContent .postingsButton').click();
    cy.url().should('contain', '/postings')
  })
});