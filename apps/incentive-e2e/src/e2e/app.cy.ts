describe('incentive', () => {
  beforeEach(() => cy.visit('/'));

  it('should has working login form', () => {
    cy.get('#login-form').should('exist');
    cy.get('mat-card-title').contains('Log in');
    cy.login('admin@local', 'admin');
    cy.get('#login-form').should('not.exist');
  });
});
