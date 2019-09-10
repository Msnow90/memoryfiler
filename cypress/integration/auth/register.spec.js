describe('When trying to register...', () => {
    it('can open register form', () => {
        // cy.visit('localhost:3000')

        // cy.get('.navigation-right > .action-btn')
        // .click()      
    })

    it('can register a user', () => {

        cy.register('testuser', 'password', 'testuser@test.com')

        cy.deleteUser('testuser')
        // cy.get('#register-username')
        // .type('testuser')

        // cy.get('#register-password')
        // .type('password')

        // cy.get('#register-email')
        // .type('testuser@email.com')

        // cy.get('#register-submit')
        // .click()

        // cy.pause(2000);

        // cy.get('#dashboard-logout-btn')
        // .click()

        // User.deleteOne({username: 'testuser'})
    })
})