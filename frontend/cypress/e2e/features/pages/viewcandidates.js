export class ViewCandidates {
    openExtendedSearchbar() {
        cy.get('[data-testid=" input"]')
            .click({ force: true });
    }

    typeKeyword(text) {
        cy.get('[data-testid="keyword input"]')
            .type(text);
    }

    typeLocation(text) {
        cy.get('[data-testid="location input"]')
            .type(text);
    }

    clickExtendedSearchbarSearchButton() {
        cy.get('[data-testid="ExtendedSearchbar search button"]')
            .click();
    }

    selectSearchResultItem() {
        cy.get('div[data-testid="ApplicantSearchResultItemList"]')
            .first()
            .children()
            .click();
    }

    selectPreferredWorkplaces() {
        cy.get('[data-testid="QuickViewMorePreferredWorkplaces"]')
            .click();
    }

    clickSortButton(){
        cy.get('[data-testid="ApplicantSearchList dropdown"]')
          .click()
    }

    selectSortActuality(){
        cy.get('span:contains("Aktualität")')
           .click();
    
    }

    selectSortRelevance(){
        cy.get('span:contains("Relevanz")')
           .click();
    }
}
