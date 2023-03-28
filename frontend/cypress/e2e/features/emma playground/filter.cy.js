import { SearchbarFilter } from '../pages/searchbarfilter.js';

const searchbar = new SearchbarFilter();

describe('filter tests', () => {
    it('search and filter using search terms and filter dialog', () => {
    
        searchbar.typeKeyword('Manager');

        searchbar.typeLocation('Linz');

        searchbar.enterNearbySearch();

        searchbar.increaseRadiusNearbySearch();

        searchbar.decreaseRadiusNearbySearch();

        searchbar.openFilterDialog();

        searchbar.enterEmploymentTypes('Teilzeit', 'Praktika', 'Diplomarbeit, Dissertation');

        //cy.get('.tooltipTitle')
            //.trigger('mouseover').invoke('show');
        //cy.contains('Wähle ein oder mehrere Berufsfelder aus.Die gewünschte Berufserfahrung wird in jedem gewählten Berufsfeld gesucht, muss aber nicht in allen gleichzeitig vorhanden sein');

        searchbar.enterBranches('Beratung', 'Recht, Steuern, Wirtschaft', 'Bildungswesen');

        searchbar.addJobExperience();
        searchbar.chooseJobField();
        searchbar.enterJobField('Beratung, Consulting');
        //cy.get('.tooltipTitle')
            //.trigger('mouseover').invoke('show');
        //cy.contains('Die gewünschte Berufserfahrung wird in jedem gewählten Berufsfeld gesucht, muss aber nicht in allen gleichzeitig vorhanden sein');

        searchbar.typeJobExperienceMin('5');
        { true; }

        searchbar.typeJobExperienceMax('8');

        searchbar.enterEducationGroups('Uni-Abschluss', 'FH-Abschluss');

        searchbar.typeSalaryMin('500');

        searchbar.typeSalaryMax('2000');

        searchbar.addLanguage();

        searchbar.chooseLanguage();

        searchbar.enterLanguage(['Deutsch']);

        searchbar.chooseLanguageLevel();

        searchbar.enterLanguageLevel(['Muttersprache']);

        searchbar.addLanguage();

        searchbar.chooseLanguage();

        searchbar.enterLanguage(['Englisch']);

        searchbar.chooseLanguageLevel();

        searchbar.enterLanguageLevel(['Fließend']);

        searchbar.deleteLanguageAndLevel();

        searchbar.clickFilterModalSearchButton();

        expect('[data-testid="filter search"]').to.be.equal('[data-testid="filter search"]');
        assert.equal(4, '4', 'NOT EQUAL');
    });

    it('filter with filter dialog and reset filters', () => {
        searchbar.openFilterDialog();

        searchbar.enterEmploymentTypes('Teilzeit', 'Praktika');
        
        searchbar.addJobExperience();
        searchbar.chooseJobField();
        searchbar.enterJobField('Beratung, Consulting', 'Einkauf, Logistik');
        
        searchbar.enterBranches('Bau, Immobilien, Haustechnik', 'Beratung');

        searchbar.clickFilterResetButton();

        searchbar.closeFilterDialog();

    });
});
