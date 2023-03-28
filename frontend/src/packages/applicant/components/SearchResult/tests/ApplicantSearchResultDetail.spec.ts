import { flushPromises, mount } from '@vue/test-utils';
import {
    expect, it, render, screen, user,
} from '../../../../../../tests/drivers/vitest/utils';

import ApplicantSearchResultDetail from '../SearchResultDetail/ApplicantSearchResultDetail.vue';
import BaseAvatar from '../../../../shared/components/base/BaseAvatar.vue';

it('should render the applicant search form', async () => {
    render(ApplicantSearchResultDetail);
    expect(await screen.findByTestId('ApplicantSearchResultDetail')).toBeInTheDocument();
});

it('should render the applicant base avatar', async () => {
    render(BaseAvatar, {
        props: {
            isPending: true,
            width: 53,
            height: 53,
        },
    });
    expect(await screen.findByTestId('profile pending avatar')).toBeInTheDocument();
});

it('should render empty state view', async () => {
    render(ApplicantSearchResultDetail, {
        props: {
            noApplicantsList: false,
        },
    });
    expect(await screen.findByTestId('ApplicantSearchResultDetail emptyState')).toBeInTheDocument();
});

it('should render no result view', async () => {
    render(ApplicantSearchResultDetail, {
        props: {
            noApplicantsList: true,
        },
    });
    expect(await screen.findByTestId('ApplicantSearchResultDetail noResult')).toBeInTheDocument();
});

it('should show a navagation header on mobile view', async () => {
    render(ApplicantSearchResultDetail, {
        props: {
            noApplicantsList: false,
        },
    });

    expect(await screen.findByTestId('ApplicantSearchResultDetail Navigation')).toBeInTheDocument();

    const backButton = await screen.findByTestId('BaseBackNavigation button');
    user.click(backButton);
});

it('should set the correct classes if the scrollContainer gets scrolled', async () => {
    const wrapper = mount(ApplicantSearchResultDetail, {
        props: {},
    });
    const scrollContainer = wrapper.find('.ApplicantSearchResultDetailScrollContainer');
    expect(scrollContainer.exists()).toBe(true);
    const nav = wrapper.find('.ApplicantSearchResultDetail.Navigation');
    expect(nav.exists()).toBe(true);
    expect(nav.element.classList.contains('shadow-bottom')).toBe(false);
    expect(nav.element.classList.contains('z-10')).toBe(false);
    Object.defineProperty(scrollContainer.element, 'scrollTop', { value: 100 });
    scrollContainer.element.dispatchEvent(new Event('scroll'));
    await flushPromises();
    expect(nav.element.classList.contains('shadow-bottom')).toBe(true);
    expect(nav.element.classList.contains('z-10')).toBe(true);
});
