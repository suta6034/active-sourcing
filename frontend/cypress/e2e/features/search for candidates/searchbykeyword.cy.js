import { SearchbarFilter } from '../pages/searchbarfilter.js';

const searchbar = new SearchbarFilter();

it('search by keyword', () => {
    /* 
        Given the candidate search is visible and the search field "Keyword" is available in the extended search bar
        When I enter a keyword e.g. "Developer" into the field "Keyword" for which results are returned
        And I press the "Search" button
        Then I get search results of candidates which match only the defined searched keyword
        And the search result count is also displayed 
    */

    searchbar.typeKeyword('Entwickler');
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();

});