import { ViewCandidates } from '../pages/viewcandidates.js';

const viewcandidates = new ViewCandidates();

it('view candidate quick profile', () => {
    viewcandidates.openExtendedSearchbar();

    viewcandidates.typeKeyword('Entwickler');

    viewcandidates.typeLocation('Wien');

    viewcandidates.clickExtendedSearchbarSearchButton();

    viewcandidates.selectSearchResultItem();
});
