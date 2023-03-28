import {
    expect, it, render, screen,
} from '../../../../../../tests/drivers/vitest/utils';

import ApplicantSearchResultItemList from '../SearchResultList/SearchResultListItem/ApplicantSearchResultItemList.vue';

it('should render no results when triggering an empty search', async () => {
    render(ApplicantSearchResultItemList, {
        props: {
            applicants: {
                data: [],
            },
        },
    });
    expect(await screen.findByTestId('ApplicantSearchResultItemNoResult')).toBeInTheDocument();
});

it('should render search result item list when having data', async () => {
    render(ApplicantSearchResultItemList, {
        props: {
            applicants: {
                data: [{
                    id: 'test id',
                    attributes: {
                        objective: {
                            jobs: ['teamleader'],
                            location: {
                                preferredWorkplaces: [{ label: 'test label' }],
                            },
                        },
                        lastPosition: {
                            title: 'foo', company: 'bar',
                        },
                    },
                }],
            },
        },
    });
    expect(await screen.findByTestId('ApplicantSearchResultItemList')).toBeInTheDocument();
});
