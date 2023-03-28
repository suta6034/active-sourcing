it('select search item', () => {
    cy.get('[data-testid=" input"]')
        .click({ force: true });

    cy.get('[data-testid="keyword input"]')
        .type('Entwickler');

    cy.get('[data-testid="location input"]')
        .type('Wien');

    cy.get('[data-testid="ExtendedSearchbar search button"]')
        .click();

    cy.get('[data-testid="ApplicantSearchResultItem 2114704"]')
        .click();

    // with preferred workplaces
    cy.get('[data-testid="ApplicantSearchResultItem 2085525"]')
        .click();

    cy.get('[data-testid="ProfileMorePreferredWorkplaces"]')
        .click();

    cy.get('[data-testid="ProfileMorePreferredWorkplaces"]');
});
