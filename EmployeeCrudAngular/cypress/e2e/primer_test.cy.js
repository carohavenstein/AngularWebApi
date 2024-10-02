describe('Mi primera prueba', () => {
    it('Carga correctamente la página de ejemplo', () => {
      cy.visit('http://localhost:4200/') // Colocar la url local o de Azure de nuestro front
      cy.get('h1').should('contain', 'EmployeeCrudAngular') // Verifica que el título contenga "EmployeeCrudAngular"
      /* ==== Generated with Cypress Studio ==== */
      cy.visit('http://localhost:4200/');
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.btn').click();
      cy.get('.form-control').clear('M');
      cy.get('.form-control').type('Miley Cyrus');
      cy.get('.btn').click();
      /* ==== End Cypress Studio ==== */
    })
  })