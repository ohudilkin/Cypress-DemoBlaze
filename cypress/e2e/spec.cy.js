/// <reference types='cypress' />
import { faker } from '@faker-js/faker';
describe('demoblaze', () => {
  const userData = {
    username: 'fypere',
    password: 'A4cmJHygEg@UnLH',
  };
  const testData = {
    username: faker.person.firstName() + Math.ceil(Math.random() * 1000),
    password: faker.internet.password(),
    product: 'Samsung galaxy s6',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('shoud allow to login', () => {
    cy.get('#login2').click();
    //the username field fills only partly if we don`t use cy.wait here
    cy.wait(1000);
    cy.get('#loginusername').type(userData.username);
    cy.get('#loginpassword').type(userData.password);
    cy.get(
      '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
    ).click({ force: true });
    cy.get('#nameofuser').should('contain', userData.username);
  });

  it('shoud allow to register', () => {
    cy.get('#signin2').click();
    cy.wait(1000);
    cy.get('#sign-username').type(testData.username);
    cy.get('#sign-password').type(testData.password);
    cy.get(
      '#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
    ).click({ force: true });
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Sign up successful.');
    });
  });
  // cy.get(':nth-child(1) > .card > .card-block')

  it.only('shoud allow to add Samsung Galaxy s6 to the cart', () => {
    // cy.contains('.card-block', testData.product).wait(1000).click({ force: true });
    cy.contains('.hrefch', testData.product).click();
    cy.get('.col-sm-12 > .btn').click();

    cy.get('#cartur').click();
    cy.get('.success > :nth-child(2)').should('contain', testData.product)
  });
});
