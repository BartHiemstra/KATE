describe('User Story 2 - Enter properties', () => {
    it('Start app', () => {
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
        cy.get('#input-wallType').select('Beton').wait(500)
        cy.get('#input-floorType').select('Beton').wait(500)
        cy.get('#input-roofType').select('Beton').wait(500)
        cy.get('#input-facadeType').select('Beton').wait(500)

        cy.get('#btn-continue').click()

        // Assert
        cy.get('#label-residualValue').should('contain.text', 'Restwaarde')
    })
})