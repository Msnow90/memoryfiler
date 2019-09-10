const mongoose = require('mongoose');
const User = require('../../models/User');

const testDbUrl = 'mongodb://localhost/memoryfilertest';

mongoose.connect(testDbUrl, {useNewUrlParser: true});

Cypress.Commands.add('register', (username, password, email) => {
    cy.visit('localhost:3000')

    cy.get('.navigation-right > .action-btn')
    .click()
    
    cy.get('#register-username')
    .type(username)

    cy.get('#register-password')
    .type(password)

    cy.get('#register-email')
    .type(email)

    cy.get('#register-submit')
    .click()

    cy.pause(2000);

    cy.get('#dashboard-logout-btn')
    .click()
})

Cypress.Commands.add('deleteUser', (username) => {
    User.deleteOne({username: username})
})