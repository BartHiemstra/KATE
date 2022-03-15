describe('Entering address', () => {
    it('Clicks button "Verder"', () => {
        //Arrange
        cy.visit('http://localhost:3000')

        //Act
        cy.get('input[name="input-postal"]').type("3526KS")
        cy.get('input[name="input-housenumber"]').type("400")
        cy.contains('Verder').click()

        //Assert
        cy.get('h5').should('contain.text', 'Gebouwgegevens')                
    })
})