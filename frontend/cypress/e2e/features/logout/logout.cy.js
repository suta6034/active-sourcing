it('logout', () => {
    /* 
        Given I am already logged in to the Active Sourcing Platform
        When I click the logout button
        Then I am logged out of the Active Sourcing Platform
        And the login page of the other B2B application of karriere.at e.g. Business Portal is shown
    */

    cy.get('[data-testid="LogoutButton"]')
      .click();
})