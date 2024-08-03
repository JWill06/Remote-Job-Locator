describe('Saved Postings Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://remotive.com/api/remote-jobs', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('jobApi');
    cy.visit('http://localhost:3000/SavedPostings')
  })
  it('Should show a main header on page load', () => {
    cy.get('.savedWrapper .mainHeader').should('exist');
    cy.get('.savedWrapper .mainHeader').should('contain', 'Saved Postings')
  });
  it('Saves a posting and views it in the saved postings page', () => {
    cy.visit('http://localhost:3000/postings');
    cy.get(':nth-child(3) > .contentWrapper > .secondContent > .saveForLater').click();
    cy.wait(5000); 
    
    cy.visit('http://localhost:3000/SavedPostings');
    
    cy.get('.savedWrapper').should('contain', 'Senior Healthcare Data Analyst') 
    .and('contain', 'Position: Senior Healthcare Data Analyst')
    .and('contain', 'Company: Imagen Technologies')
    .and('contain', '$90,000 - $120,000 plus benefits')
    .and('contain', 'Posted: Jul 27 2024')
    .and('contain', 'Candidate Location: USA')
  });
})