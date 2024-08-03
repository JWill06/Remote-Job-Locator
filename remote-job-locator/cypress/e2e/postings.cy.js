describe('Postings Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://remotive.com/api/remote-jobs', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('jobApi');
    cy.visit('http://localhost:3000/postings')
  })
  it('Should contain search features', () => {
    cy.get('.filterInputs .titleFilter').should('exist')
    cy.get('.filterInputs .locationFilter').should('exist')
  })
  it('Should display users inputs', () => {
    cy.get('input[name="filterTitle"]').clear().type('senior');
  })
  it("Should display a message if nothing exists from the input", () => {
    cy.get('input[name="filterTitle"]').type('cancer');
    cy.contains('Nothing to display, try a different search!');
  })
  it('Should display short information for jobs', () => {
    cy.get('.mainPostingsWrapper .logoWrapper .companyLogo').should('exist')
    cy.get('.mainPostingsWrapper').should('contain', 'Position: Senior Healthcare Data Analyst')
    .and('contain', 'Company: Imagen Technologies')
    .and('contain', '$90,000 - $120,000 plus benefits')
    .and('contain', 'Posted: Jul 27 2024')
    .and('contain', 'Candidate Location: USA')
  })
  it('Should allow you to save a posting', () => {
    cy.get('.mainPostingsWrapper .contentWrapper .secondContent .saveForLater', { timeout: 10000 }).should('be.visible').then(($btn) => {
      $btn.click();
  
      cy.get('.mainPostingsWrapper .contentWrapper .secondContent .saveForLater').should('have.class', 'saveForLater');
    });
  })
})