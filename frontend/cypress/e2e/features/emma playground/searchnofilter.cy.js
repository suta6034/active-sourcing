import { SearchbarFilter } from '../pages/searchbarfilter.js';

const searchbar = new SearchbarFilter();

it('search with search terms no filter dialog', () => {
    searchbar.openExtendedSearchbar();

    searchbar.typeKeyword('Programmierer');

    searchbar.clickExactSearchButton();

    searchbar.enterKeywordFilters('Kenntnisse', 'Arbeitgeber', 'Ausbildung');

    searchbar.typeLocation('Wien');

    searchbar.clickReadyToMoveButton();
});
