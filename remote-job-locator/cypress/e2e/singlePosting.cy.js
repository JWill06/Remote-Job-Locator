describe('Single Posting Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://remotive.com/api/remote-jobs', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('jobApi');  
  })
  it('Should be able to click on more details and taken to more information', () => {
    cy.visit('http://localhost:3000/postings');
    cy.get(':nth-child(3) > .contentWrapper > .secondContent > .moreDetails').click();
    cy.wait(1000); 
    cy.url().should('contain', '/posting/1925508')
  })
  it('Should display proper information for the posting', () => {
    cy.visit('http://localhost:3000/posting/1925508')
    cy.get('.detailsWrapper').should('contain', 'Senior Healthcare Data Analyst')
    .and('contain', 'Imagen Technologies')
    .and('contain', 'Jul 27 2024')
    .and('contain', 'USA')
    .and('contain', '$90,000 - $120,000 plus benefits')
    .and('contain', 'Imagen Technologies is a high-growth')
  })
  it('Should have a back to postings button', () => {
    cy.visit('http://localhost:3000/posting/1925508')
    cy.get('.detailsWrapper .singlePostingButtons .backButton .backLink').should('exist')
  })
  it('Should allow you to save a posting', () => {
    cy.visit('http://localhost:3000/posting/1925508')
    cy.get('.saveLater').click();
    cy.get('.saved').should('have.class', 'saved')
  })
  it('Should be able to go back to postings', () => {
    cy.visit('http://localhost:3000/posting/1925508')
    cy.get('.detailsWrapper .singlePostingButtons .backButton .backLink').click();
    cy.url().should('contain', '/postings')
  })
})