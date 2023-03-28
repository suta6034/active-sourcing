import { SearchbarFilter } from '../pages/searchbarfilter.js';

const searchbar = new SearchbarFilter();

it('search by location and radius', () => {
    /* 
        Given the candidate search is visible and the search field "Location" and the radius field are available in the extended search bar
        When I enter a valid location e.g. "Linz" into the field "Location"
        Then the radius field becomes enabled
        When I delete the valid location from the field "Location"
        Then the radius field becomes disabled
        When I enter an invalid location e.g. "Lynz" into the field "Location"
        Then the radius field is still disabled
        When I enter "Salzburg" into the field "Location"
        Then the radius field is still disabled
        When I enter "Vienna" into the field "Location"
        Then the radius field is still disabled
        When I enter a valid district of Vienna into the field "Location" e.g. "Alsergrund"
        Then the radius field becomes enabled
        When I press the "Search" button
        Then I get search results of candidates which match only the defined searched location
        And the search result count is also displayed
        When I press the arrow up button in the radius field
        Then the radius value is increased by 10km
        When I press the arrow down button in the radius field
        Then the radius value is decreased by 10km
        When I press the arrow up button several times
        Then I can only go up as high as the maximum of 50km
        When I press the "Search" button
        Then I get search results of candidates which match only the defined searched location and the given radius
        And the search result count is also displayed 
    */

    searchbar.openFilterDialog();
    searchbar.clickReadyToMoveButton();
    searchbar.closeFilterDialog();
    searchbar.typeLocation('Linz');
    searchbar.enterNearbySearch().should('not.be.disabled');
    searchbar.clearLocation();
    searchbar.typeLocation('Lynz');
    searchbar.enterNearbySearch().should('not.be.enabled');
    searchbar.clearLocation();
    searchbar.typeLocation('Salzburg'); 
    searchbar.enterNearbySearch().should('not.be.enabled');
    searchbar.clearLocation();
    searchbar.typeLocation('Wien'); 
    searchbar.enterNearbySearch().should('not.be.enabled');
    searchbar.clearLocation();
    searchbar.typeLocation('Alsergrund');  
    searchbar.enterNearbySearch().should('not.be.disabled');
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();
    searchbar.increaseRadiusNearbySearch();
    searchbar.checkNearbySearchRadiusInput().should('have.value', '+10');
    searchbar.decreaseRadiusNearbySearch();
    searchbar.checkNearbySearchRadiusInput().should('have.value', '+0');
    searchbar.increaseRadiusNearbySearch();
    searchbar.checkNearbySearchRadiusInput().should('have.value', '+10');
    searchbar.increaseRadiusNearbySearch();
    searchbar.increaseRadiusNearbySearch();
    searchbar.increaseRadiusNearbySearch();
    searchbar.increaseRadiusNearbySearch();
    searchbar.increaseRadiusNearbySearch();
    searchbar.checkNearbySearchRadiusInput().should('have.value', '+50');   
    searchbar.clickExtendedSearchbarSearchButton();
    searchbar.selectSearchResultItem();

});