describe('App launch', () => {
    it('App loads successfully', () => {
        //Arrange
        cy.visit('http://localhost:3000')

        //Assert
        cy.get('title').should('contain.text','React App')
    })
})