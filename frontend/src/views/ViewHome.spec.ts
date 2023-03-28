import { ref } from 'vue';

import {
    expect, it, mockEndpoint, render, screen, user, beforeEach, describe, vi,
} from '../../tests/drivers/vitest/utils';
import * as search from '../packages/applicant/__test__/preconditions/search';
import * as filter from '../packages/applicant/__test__/preconditions/filter';
import * as breakpointComposable from '../packages/shared/composables/breakpoint';

import ViewHome from './ViewHome.vue';

vi.doMock('../../packages/shared/composables/breakpoint.ts');

beforeEach(() => {
    vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));
    search.hasResults({ mockEndpoint });
    filter.hasFilterLabels({ mockEndpoint });
    filter.validLocation({ mockEndpoint });
    render(ViewHome);
});

describe('ApplicantSearchPage', () => {
    it('should render the applicant data', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);
        await user.click(await screen.findByRole('button', {
            name: 'Suchen',
        }));

        expect(await screen.findByText('foo')).toBeInTheDocument();
        expect(await screen.findByText('teamleader')).toBeInTheDocument();
        expect(await screen.findByText('test label')).toBeInTheDocument();
    });

    it('should show extended search bar when clicking initial search bar', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);

        expect(await screen.findByTestId('ApplicantSearchField Extended')).toBeInTheDocument();
    });

    it('should trigger search when clicking the search button in modal', async () => {
        // OK
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);

        const filterButton = await screen.findByTestId('ApplicantSearchField filter button');
        await user.click(filterButton);

        await user.click(await screen.findByTestId('ApplicantFilterModal search button'));

        // filter modal: trigger search by clicking button
        expect(await screen.findByText('foo')).toBeInTheDocument();
    });

    it('should render search result item cards when triggering search', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);

        const searchButton = await screen.findByTestId('ExtendedSearchbar search button');
        await user.click(searchButton);

        expect(await screen.findByTestId('ApplicantSearchResultItem test id')).toBeInTheDocument();
    });

    it('should show quick view item when click on search result item', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);

        const searchButton = await screen.findByTestId('ExtendedSearchbar search button');
        await user.click(searchButton);

        const resultItem = await screen.findByTestId('ApplicantSearchResultItem test id');
        await user.click(resultItem);

        expect(await screen.findByTestId('ProfileTitleHeader')).toBeInTheDocument();
    });

    it('should initial render search result on mounted', async () => {
        expect(await screen.findByTestId('ApplicantPage')).toBeInTheDocument();
        expect(await screen.findByTestId('ApplicantSearchResultDetail')).toBeInTheDocument();
        expect(await screen.findByTestId('ApplicantSearchList')).toBeInTheDocument();
        expect(await screen.findByTestId('ApplicantSearchResultItem test id')).toBeInTheDocument();
    });
});

describe('ApplicantFilterExactSearch', () => {
    it('should show search result when toggling exact search button', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);

        const filterButton = await screen.findByTestId('ApplicantSearchField filter button');
        await user.click(filterButton);

        const toggleButton = await screen.findByTestId('ApplicantFilterExactSearch toggle button');
        await user.click(toggleButton);
        await user.click(await screen.findByTestId('BaseModal closebutton'));

        // exact search toggle button: check if search triggered
        expect(await screen.findByText('foo')).toBeInTheDocument();
    });
});

describe('ApplicantSearchList', () => {
    it('should show sort menu when clicking sort dropdown', async () => {
        const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
        await user.click(initialSearchbar);
        const searchButton = await screen.findByTestId('ExtendedSearchbar search button');
        await user.click(searchButton);

        // open menu by clicking sort button
        const sortMenu = await screen.findByRole('button', {
            name: 'Sortieren',
        });
        await user.click(sortMenu);

        // show dropdown
        const dropdown = await screen.findByTestId('li Relevanz');
        await user.click(dropdown);

        // close dropdown
        await user.click(sortMenu);
        expect(await dropdown).not.toBeInTheDocument();
    });
});
