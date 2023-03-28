export class SearchbarFilter {

    setCursorKeywordInputField() {
        cy.get('[data-testid="keyword input"]')
            .click();
    }
    
    typeKeyword(text) {
        cy.get('[data-testid="keyword input"]')
            .type(text);
    }

    typeLocation(text) {
        cy.get('[data-testid="location input"]')
            .type(text);
    }

    clearLocation() {
        cy.get('[data-testid="location input"]')
            .clear();
    }


    enterNearbySearch() {
        return cy.get('[data-testid="ApplicantFilterNearbySearch"]')
            .click();
    }

    increaseRadiusNearbySearch() {
        cy.get('[data-testid="ApplicantFilterNearbySearch increase radius button"]')
            .focus()
            .click();
    }

    decreaseRadiusNearbySearch() {
        cy.get('[data-testid="ApplicantFilterNearbySearch decrease radius button"]')
            .click();
    }

    checkNearbySearchRadiusInput() {
        return cy.get('[data-testid="ApplicantFilterNearbySearch radius input"]')
            .click();
    }


    clickExtendedSearchbarSearchButton() {
        cy.get('[data-testid="ExtendedSearchbar search button"]')
            .click();
    }

    openFilterDialog() {
        cy.get('[data-testid="ApplicantSearchField filter button"]')
            .click();
    }

    enterEmploymentTypes(...text) {
        cy.get('[data-testid="BaseFormMultiSelect employmentTypes"]')
            .click();
        for (let i = 0; i < text.length; i++) {
            cy.get(`label:contains(${text[i]})`, { timeout: 5000 })
                .click({ multiple: true });
        }
    }

    enterBranches(...text) {
        cy.get('[data-testid="BaseFormMultiSelect branches"]')
            .click();
        for (let i = 0; i < text.length; i++) {
            cy.get(`label:contains(${text[i]})`, { timeout: 5000 })
                .click({ multiple: true });
        }
    }

    addJobExperience() {
        cy.get('button:contains("+ Berufserfahrung hinzufügen")')
            .click();
    }

    chooseJobField() {
        cy.get('span:contains("Berufsfeld wählen")')
            .click();
    }

    enterJobField(text) {
        cy.get(`span:contains(${text[0]})`)
            .click();
    }

    deleteJobFieldAndExperience() {
        cy.get('DeleteEntry group mt-[24px] ml-5 focus:outline-none 2xl:ml-0')
            .click();
    }

    typeJobExperienceMin(text) {
        cy.get('SelectJobLevelFrom h-9 w-[8rem]')
            .clear()
            .type(text);
        { true; }
    }

    typeJobExperienceMax(text) {
        cy.get('SelectJobLevelTo h-9 w-[8rem]')
            .clear()
            .type(text);
    }

    enterEducationGroups(...text) {
        cy.get('[data-testid="BaseFormMultiSelect educationGroups"]')
            .click({ force: true });
        for (let i = 0; i < text.length; i++) {
            cy.get(`label:contains(${text[i]})`, { timeout: 5000 })
                .click();
        }
    }

    typeSalaryMin(text) {
        cy.get('[data-testid="salary min"]')
            .type(text);
    }

    typeSalaryMax(text) {
        cy.get('[data-testid="salary max"]')
            .type(text);
    }

    addLanguage() {
        cy.get('button:contains("+ Sprache hinzufügen")')
            .click();
    }

    chooseLanguage() {
        cy.get('button:contains("Sprache wählen")')
            .click();
    }

    enterLanguage(text) {
        cy.get(`span:contains(${text[0]})`)
            .click();
    }

    chooseLanguageLevel() {
        cy.get('button:contains("Alle")')
            .click({ multiple: true });
    }

    enterLanguageLevel(text) {
        cy.get(`span:contains(${text[0]})`)
            .click();
    }

    deleteLanguageAndLevel() {
        cy.get(':nth-child(1) > .DeleteEntry > .stroke-gray-400')
            .click();
    }

    clickReadyToMoveButton() {
        cy.get('label:contains("Umzugsbereite Kandidaten anzeigen")')
            .click();
    }

    clickExactSearchButton() {
        cy.get('label:contains("Exakter Wortlaut")')
            .click();
    }

    enterKeywordFilters(...text) {
        cy.get('[data-testid="BaseFormMultiSelect keywordFilters"]')
            .click();

        for (let i = 0; i < text.length; i++) {
            cy.get(`label:contains(${text[i]})`, { timeout: 5000 })
                .click({ multiple: true });
        }
        cy.get('[data-testid="BaseFormMultiSelect keywordFilters"]')
            .click();
    }

    clickFilterModalSearchButton() {
        cy.get('[data-testid="ApplicantFilterModal search button"]')
            .click();
    }

    clickFilterResetButton() {
        cy.get('button:contains("Zurücksetzen")')
            .click();
    }

    closeFilterDialog() {
        cy.get('[data-testid="BaseModal closebutton"]')
            .click();
    }

    selectSearchResultItem() {
        cy.get('div[data-testid="ApplicantSearchResultItemList"]')
          .first()
          .click({force: true});
    }
}
