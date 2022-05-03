describe('User Story 1 - Enter address', () => {
    it('Fill in address, then press enter to confirm', () => {
        // Arrange
        cy.visit('http://localhost:3000')
        cy.wait(3000)

        // Act
        cy.wait(12000)
        cy.get('input[name="input-address"]').type("Europalaan 400, 3526 KS Utrecht").wait(2000).type('{enter}')

        // Assert
        cy.wait(12000)
        cy.get('h4').should('contain.text', 'Geometrie')
    })
})