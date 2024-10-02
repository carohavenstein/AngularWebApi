describe('editEmployeeTest', () => {
    it('Carga correctamente la página de ejemplo', () => {
      cy.visit('http://localhost:4200/') // Colocar la url local o de Azure de nuestro front
      /* ==== Generated with Cypress Studio ==== */
      cy.get(':nth-child(7) > :nth-child(4) > a > .fa').click();
      cy.get('.form-control').clear();
      cy.get('.form-control').type('Lando Norris');
      cy.get('.btn').click();
      /* ==== End Cypress Studio ==== */
    })
  })