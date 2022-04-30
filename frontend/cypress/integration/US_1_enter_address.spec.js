describe('User Story 1 - Enter address', () => {
    it('Fill in address, then press enter to confirm', () => {
        // Arrange
        cy.visit('http://localhost:3000')
        cy.wait(3000)

        // Act
        cy.get('input[name="input-address"]').type("Europalaan 400, 3526 KS Utrecht").wait(500).type('{enter}')

        // Assert
        cy.get('h4').should('contain.text', 'Geometrie')
    })
})