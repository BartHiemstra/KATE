describe('User Story 2 - Enter properties', () => {
    it('Start app', () => {
        // Arrange
        cy.visit('http://localhost:3000')
        cy.wait(3000)

    })
    it('Fill in address, then press enter.', () => {
        // Act
        cy.get('input[name="input-address"]').type("Europalaan 400, 3526 KS Utrecht").wait(500).type('{enter}')

        // Assert
        cy.get('h4').should('contain.text', 'Geometrie')
    })
    it('Fill out properties, then press continue button.', () => {
        // Act
        cy.get('input[name="input-floorAmount"]').type('8').wait(500)
        cy.get('#input-foundationType').select('Betonpalen').wait(500)
        cy.get('input[name="input-foundationDepth"]').type('12.5').wait(500)
        cy.get('#input-supportType').select('Beton').wait(500)

        cy.get('#btn-continue').click()

        // Assert
        cy.get('#label-residualValue').should('contain.text', 'Restwaarde')
    })
})