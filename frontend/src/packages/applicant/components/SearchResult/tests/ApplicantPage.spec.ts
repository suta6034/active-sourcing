import { ref } from 'vue';

import { flushPromises, mount } from '@vue/test-utils';
import {
    describe,
    expect, it, mockEndpoint, render, screen, user, vi,
} from '../../../../../../tests/drivers/vitest/utils';
import * as search from '../../../__test__/preconditions/search';
import * as breakpointComposable from '../../../../shared/composables/breakpoint';
import * as ApplicantService from '../../../repositories/applicant-repository';
import * as FilterService from '../../../repositories/filter-repository';

import { useApplicant } from '../../../../shared/composables/applicant';
import { useLang } from '../../../../shared/composables/i18n';
import router from '../../../../../router';
import * as tracking from '../../../../../util/tracking/tracking';

import ApplicantPage from '../ApplicantPage.vue';
import TheHeader from '../../../../../components/TheHeader.vue';

const {
    applicants,
    standAloneApplicantId,
    selectedApplicantId,
    applicantApprovalId,
    applicantProfileData,
} = useApplicant();

const {
    lang: globalLang,
} = useLang();

vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));

const stubs = {
    ApplicantSearchList: {
        template: '<div class="ApplicantSearchList"/>',
    },
    ApplicantSearchResultDetail: {
        template: '<div class="ApplicantSearchResultDetail" data-testid="ApplicantSearchResultDetail"/>',
    },
    StandAlone: {
        template: '<div class="StandAlone"/>',
    },
};

const emptyProfileData = {
    availabilityId: 1,
    furtherEducations: [],
    preferredWorkplaces: [],
    profileId: 12345,
    projectsAndAwards: [],
    readyToMove: false,
    experiences: [],
    languages: [],
    educations: [],
    skills: null,
    objective: null,
    interests: [],
    aboutMe: '',
};

it('should render search page with no results', async () => {
    const mockValidateLocation = vi.spyOn(FilterService, 'validateLocation')
        .mockImplementation(() => Promise.resolve({ data: { valid: true }, error: null }));
    const mockGetAllFilterLabels = vi.spyOn(FilterService, 'getAllFilterLabels')
        .mockImplementation(() => Promise.resolve({ data: [], error: null }));
    search.hasNoResults({ mockEndpoint });
    render(TheHeader);
    render(ApplicantPage);
    const initialSearchbar = await screen.findByTestId('ApplicantSearchField');
    await user.click(initialSearchbar);
    await user.click(await screen.findByRole('button', {
        name: 'Suchen',
    }));
    expect(await screen.findByTestId('ApplicantSearchResultDetail')).toBeInTheDocument();
    mockValidateLocation.mockRestore();
    mockGetAllFilterLabels.mockRestore();
});
describe('Search Page', () => {
    it('should render nothing if neither applicants nor standAloneApplicantId are set', () => {
        applicants.value = {
            data: [],
            meta: null,
            error: null,
        };
        standAloneApplicantId.value = '';
        const wrapper = mount(ApplicantPage, {
            global: {
                stubs,
                plugins: [router],
            },
        });
        expect(wrapper.find('.ApplicantPage').exists()).toBe(false);
        expect(wrapper.find('.ApplicantSearchList').exists()).toBe(false);
        expect(wrapper.find('.ApplicantSearchResultDetail').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalInformation').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalMessage').exists()).toBe(false);
        expect(wrapper.find('.StandAlone').exists()).toBe(false);
    });
    it('should render the search page with the search list but no stand alone view', () => {
        applicants.value = {
            data: [],
            meta: {
                pagination: {
                    number: 1,
                    size: 15,
                    total: 4754,
                    pages: 317,
                },
            },
            error: null,
        };
        standAloneApplicantId.value = '123';
        const wrapper = mount(ApplicantPage, {
            global: {
                stubs,
                plugins: [router],
            },
        });
        const container = wrapper.find('.ApplicantPage');
        expect(container.exists()).toBe(true);
        expect(container.find('.ApplicantSearchList').exists()).toBe(true);
        expect(container.find('.ApplicantSearchResultDetail').exists()).toBe(true);
        expect(container.find('.ApplicantApprovalInformation').exists()).toBe(false);
        expect(container.find('.ApplicantApprovalMessage').exists()).toBe(false);
        expect(container.find('.StandAlone').exists()).toBe(false);
        expect(container.element.classList.contains('w-full')).toBe(false);
        expect(container.element.classList.contains('flex')).toBe(true);
    });
    it('should render the search page without the search list but the stand alone view', () => {
        applicants.value = {
            data: [],
            meta: null,
            error: null,
        };
        standAloneApplicantId.value = '123';
        const wrapper = mount(ApplicantPage, {
            global: {
                stubs,
                plugins: [router],
            },
        });
        expect(wrapper.find('.ApplicantPage').exists()).toBe(false);
        expect(wrapper.find('.ApplicantSearchList').exists()).toBe(false);
        expect(wrapper.find('.ApplicantSearchResultDetail').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalInformation').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalMessage').exists()).toBe(false);
        expect(wrapper.find('.StandAlone').exists()).toBe(true);
        expect(wrapper.element.classList.contains('w-full')).toBe(true);
        expect(wrapper.element.classList.contains('flex')).toBe(true);
    });
    it('should show the standalone view if profile id is set in the route params', async () => {
        const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
            .mockImplementation(() => Promise.resolve(null));
        const isTwoXLScreen = ref(true);
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(isTwoXLScreen);
        router.currentRoute.value.fullPath = '/candidate/123';
        router.currentRoute.value.params = {
            profileId: '123',
        };
        standAloneApplicantId.value = '';
        render(ApplicantPage, undefined, stubs);
        await flushPromises();
        expect(standAloneApplicantId.value).toStrictEqual('123');
        const container = screen.getByTestId('StandAlonePage');
        const standaloneView = container.querySelector('.StandAlone');
        expect(standaloneView).not.toBeNull();
        isTwoXLScreen.value = false;
        await flushPromises();
        mockgetProfileData.mockRestore();
        mockUseBreakpoint.mockRestore();
    });
    it('should set the standalone view if the selectedProfile is set in the current query', async () => {
        const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
            .mockImplementation(() => Promise.resolve(null));
        const isTwoXLScreen = ref(true);
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(isTwoXLScreen);
        router.currentRoute.value.fullPath = '/?selectedProfile=123';
        router.currentRoute.value.params = {};
        router.currentRoute.value.query = {
            selectedProfile: '123',
        };
        const mockReplace = vi.spyOn(router, 'replace').mockImplementation(() => Promise.resolve());
        render(ApplicantPage, undefined, stubs);
        expect(mockReplace).toHaveBeenCalledTimes(1);
        mockgetProfileData.mockRestore();
        mockUseBreakpoint.mockRestore();
        mockReplace.mockRestore();
    });
    describe.each([
        [false, false],
        [false, true],
        [true, false],
        [true, true],
    ])(
        'do tracking and set the path if an applicant is selected from the list',
        (isTwoXLScreen, isNewSelectedApplicantId) => {
            it(`where isTwoXLScreen is '${isTwoXLScreen}'`, async () => {
                const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
                    .mockReturnValue(ref(isTwoXLScreen));
                const mockReplace = vi.spyOn(router, 'replace').mockImplementation(() => Promise.resolve());
                const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
                    .mockImplementation(() => Promise.resolve(null));
                const mockTracking = vi.spyOn(tracking, 'tracking').mockImplementation(() => undefined);
                router.currentRoute.value.params = {};
                router.currentRoute.value.query = {};
                applicants.value = {
                    data: [{
                        attributes: {
                            lastPosition: undefined,
                            experienceMonths: undefined,
                            objective: undefined,
                        },
                        id: '12345',
                        meta: {},
                        type: 'applicant',
                    }],
                    meta: {
                        pagination: {
                            number: 1,
                            size: 15,
                            total: 4754,
                            pages: 317,
                        },
                    },
                    error: null,
                };
                selectedApplicantId.value = isNewSelectedApplicantId ? '' : '12345';
                const wrapper = mount(ApplicantPage, {
                    global: {
                        plugins: [router],
                    },
                });
                const searchList = wrapper.find('.ApplicantSearchList');
                expect(searchList.exists()).toBe(true);
                const searchResultItems = searchList.findAll('.ApplicantSearchResultItem');
                expect(searchResultItems.length).toBe(1);
                standAloneApplicantId.value = '';
                await searchResultItems[0].trigger('click');
                expect(mockReplace).toHaveBeenCalledTimes(1);
                expect(mockReplace).toHaveBeenCalledWith({
                    path: '/',
                    query: { selectedProfile: isTwoXLScreen ? undefined : '12345' },
                });
                expect(mockgetProfileData).toHaveBeenCalledTimes(isNewSelectedApplicantId ? 1 : 0);
                expect(selectedApplicantId.value).toStrictEqual('12345');
                mockUseBreakpoint.mockRestore();
                mockReplace.mockRestore();
                mockgetProfileData.mockRestore();
                mockTracking.mockRestore();
            });
        },
    );
    it('should call set path if the value of isTwoXLScreen changes', async () => {
        const isTwoXLScreen = ref(true);
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
            .mockReturnValue(isTwoXLScreen);
        const mockReplace = vi.spyOn(router, 'replace').mockImplementation(() => Promise.resolve());
        selectedApplicantId.value = '12345';
        router.currentRoute.value.params = {};
        router.currentRoute.value.query = {};
        standAloneApplicantId.value = '';
        render(ApplicantPage, undefined, stubs);
        expect(mockReplace).toHaveBeenCalledTimes(0);
        isTwoXLScreen.value = false;
        await flushPromises();
        expect(mockReplace).toHaveBeenCalledTimes(1);
        expect(mockReplace.mock.calls[0][0]).toStrictEqual({ path: '/', query: { selectedProfile: '12345' } });
        isTwoXLScreen.value = true;
        await flushPromises();
        expect(mockReplace).toHaveBeenCalledTimes(2);
        expect(mockReplace.mock.calls[1][0]).toStrictEqual({ path: '/', query: { selectedProfile: undefined } });
        // it should not replace the current url if the standalone applicant id is set
        standAloneApplicantId.value = '9999';
        isTwoXLScreen.value = false;
        await flushPromises();
        expect(mockReplace).toHaveBeenCalledTimes(2);
        mockUseBreakpoint.mockRestore();
        mockReplace.mockRestore();
    });
    it('should call getProfileData if the language changes and a selected applicant is set', async () => {
        const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
            .mockImplementation(() => Promise.resolve(null));
        const mockGetAllFilterLabels = vi.spyOn(FilterService, 'getAllFilterLabels')
            .mockImplementation(() => Promise.resolve({ data: [], error: null }));
        selectedApplicantId.value = '';
        globalLang.value = 'de';
        render(ApplicantPage, undefined, stubs);
        expect(mockgetProfileData).toHaveBeenCalledTimes(0);
        globalLang.value = 'en';
        await flushPromises();
        expect(mockgetProfileData).toHaveBeenCalledTimes(0);
        selectedApplicantId.value = '12345';
        globalLang.value = 'de';
        await flushPromises();
        expect(mockgetProfileData).toHaveBeenCalled();
        mockgetProfileData.mockRestore();
        mockGetAllFilterLabels.mockRestore();
    });
});
describe('Approval Page', () => {
    it('should render approval page if approval id is set', () => {
        applicants.value = {
            data: [],
            meta: {
                pagination: {
                    number: 1,
                    size: 15,
                    total: 4754,
                    pages: 317,
                },
            },
            error: null,
        };
        applicantApprovalId.value = '123';
        applicantProfileData.value = emptyProfileData;
        const wrapper = mount(ApplicantPage, {
            global: {
                stubs,
                plugins: [router],
            },
        });
        expect(wrapper.find('.ApplicantSearchList').isVisible()).toBe(false);
        expect(wrapper.find('.ApplicantSearchResultDetail').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalInformation').exists()).toBe(true);
        expect(wrapper.find('.ApplicantApprovalMessage').exists()).toBe(true);
        expect(wrapper.find('.StandAlone').exists()).toBe(false);
        applicantApprovalId.value = '';
    });
    it('should render approval page if send request button is clicked', async () => {
        applicants.value = {
            data: [{
                attributes: {
                    lastPosition: undefined,
                    experienceMonths: undefined,
                    objective: undefined,
                },
                id: '12345',
                meta: {},
                type: 'applicant',
            }],
            meta: {
                pagination: {
                    number: 1,
                    size: 15,
                    total: 4754,
                    pages: 317,
                },
            },
            error: null,
        };
        applicantProfileData.value = emptyProfileData;
        selectedApplicantId.value = '12345';
        applicantApprovalId.value = '';
        render(ApplicantPage);
        await flushPromises();
        expect(selectedApplicantId.value).toStrictEqual('12345');
        const requestButton = await screen.findByTestId('SendRequestButton');
        await user.click(requestButton);
        expect(applicantApprovalId.value).toStrictEqual('12345');
        expect(await screen.findByTestId('ApplicantApprovalInformation')).toBeInTheDocument();
        expect(await screen.findByTestId('ApplicantApprovalMessage')).toBeInTheDocument();
    });
    it('should not render approval information on mobile', async () => {
        const mockUseBreakpoint = vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(false));
        applicants.value = {
            data: [],
            meta: {
                pagination: {
                    number: 1,
                    size: 15,
                    total: 4754,
                    pages: 317,
                },
            },
            error: null,
        };
        applicantApprovalId.value = '123';
        const wrapper = mount(ApplicantPage, {
            global: {
                stubs,
                plugins: [router],
            },
        });
        expect(wrapper.find('.ApplicantApprovalInformation').exists()).toBe(false);
        expect(wrapper.find('.ApplicantApprovalMessage').exists()).toBe(true);
        mockUseBreakpoint.mockRestore();
    });
});
