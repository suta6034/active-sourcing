import { SearchbarFilter } from '../pages/searchbarfilter.js';

const searchbar = new SearchbarFilter();

it('filter by readyToMove', () => {
    /* 
        Given the candidate search is visible and the search field "Location" is visible in the extended search bar 
        And the toggle button "Show candidates ready to move" is available in the filter dialog and is turned on by default
        When I press the "Search with filters" button
        Then I get only search results of candidates who are willing to move
        And the search result count is also displayed
        When I enter a location e.g. "Graz" into the field "Location" in the extended search bar for which results are returned
        And the "Show candidates ready to move" button is still turned on in the filter dialog
        And I press the "Search" button in the extended search bar
        Then I get search results of candidates which match the defined searched location as well as other locations but only in combination with being willing to move
        And the search result count is also displayed
        When I enter another location into the field "Location" but for which no results are returned
        And the "Show candidates ready to move" button is still turned on in the filter dialog
        And I press the "Search" button in the extended search bar
        Then I get search results of candidates which match other locations other than the defined searched location but only in combination with being willing to move
        And the search result count is also displayed
    */

    searchbar.setCursorKeywordInputField();
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();
    searchbar.typeLocation('Graz');
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();
    searchbar.clearLocation();
    searchbar.typeLocation('asdf');
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();
    
});