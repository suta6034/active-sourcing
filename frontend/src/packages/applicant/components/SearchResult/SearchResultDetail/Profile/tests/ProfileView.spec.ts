import { flushPromises, mount } from '@vue/test-utils';
import {
    describe,
    expect, it,
} from '../../../../../../../../tests/drivers/vitest/utils';

import type { ProfileData } from '../../../../../../shared/types/profile/types';
import { useApplicant } from '../../../../../../shared/composables/applicant';
import ProfileView from '../ProfileView.vue';

const {
    applicantProfileData,
    profileLoading,
} = useApplicant();

const stubs = {
    ProfileTitleHeader: {
        template: '<div class="ProfileTitleHeader"></div>',
    },
    ProfileContentCV: {
        template: '<div class="ProfileContentCV"></div>',
    },
    ProfileContentPersonality: {
        template: '<div class="ProfileContentPersonality"></div>',
    },
    ProfileContentFurtherEducation: {
        template: '<div class="ProfileContentFurtherEducation"></div>',
    },
};

const mockProfileData: ProfileData = {
    availabilityId: 1,
    preferredWorkplaces: [],
    profileId: 1,
    readyToMove: false,
    experiences: [],
    languages: [],
    educations: [],
    skills: {
        basic: [],
        advanced: [],
        excellent: [],
    },
    objective: {
        employmentTypeIds: [],
        jobs: [],
        salary: 1,
    },
    interests: [],
    aboutMe: '',
    furtherEducations: [],
    projectsAndAwards: [],
};

describe('ProfileView', () => {
    it('should show loading dots if the profile data is still loading', () => {
        profileLoading.value = true;
        const wrapper = mount(ProfileView, {
            global: {
                stubs,
            },
        });
        const loadingDots = wrapper.find('.BaseLoadingDots');
        expect(loadingDots.exists()).toBe(true);
        const titleHeader = wrapper.find('.ProfileTitleHeader');
        expect(titleHeader.exists()).toBe(false);
        const cv = wrapper.find('.ProfileContentCV');
        expect(cv.exists()).toBe(false);
        const personality = wrapper.find('.ProfileContentPersonality');
        expect(personality.exists()).toBe(false);
    });
    it('should render the CV initially if the profiledata is done loading', async () => {
        profileLoading.value = false;
        const wrapper = mount(ProfileView, {
            global: {
                stubs,
            },
        });
        await flushPromises();
        const loadingDots = wrapper.find('.BaseLoadingDots');
        expect(loadingDots.exists()).toBe(false);
        const titleHeader = wrapper.find('.ProfileTitleHeader');
        expect(titleHeader.exists()).toBe(true);
        const cv = wrapper.find('.ProfileContentCV');
        expect(cv.exists()).toBe(true);
        const personality = wrapper.find('.ProfileContentPersonality');
        expect(personality.exists()).toBe(false);
        const tablist = wrapper.find('.BaseTabList');
        expect(tablist.exists()).toBe(true);
    });
    describe.each([
        [false, false],
        [true, false],
        [true, true],
    ])('profile view statement', (hasProfileData, hasStatement) => {
        it(`check statement where applicantProfileData is 
            ${hasProfileData ? 'set' : 'unset'} and statement is ${hasStatement ? 'set' : 'unset'}`, async () => {
            profileLoading.value = false;
            applicantProfileData.value = hasProfileData ? mockProfileData : null;
            if (applicantProfileData.value && hasStatement) {
                applicantProfileData.value.statement = 'STATEMENT';
            }
            const wrapper = mount(ProfileView, {
                global: {
                    stubs,
                },
            });
            await flushPromises();
            const loadingDots = wrapper.find('.BaseLoadingDots');
            expect(loadingDots.exists()).toBe(false);
            // initially CV should be shown
            const titleHeader = wrapper.find('.ProfileTitleHeader');
            expect(titleHeader.exists()).toBe(true);
            let cv = wrapper.find('.ProfileContentCV');
            expect(cv.exists()).toBe(true);
            // statement should only be shown in personality tab
            let statement = wrapper.find('.ProfileViewStatement');
            expect(statement.exists()).toBe(false);
            let personality = wrapper.find('.ProfileContentPersonality');
            expect(personality.exists()).toBe(false);
            const tabList = wrapper.find('.BaseTabList');
            expect(tabList.exists()).toBe(true);
            // check the current tabList items
            const tabListItems = tabList.findAll('li');
            expect(tabListItems.length).toBe(4);
            expect(tabListItems[0].element.classList.contains('Active')).toBe(true);
            expect(tabListItems[3].element.classList.contains('Disabled')).toBe(true);

            // switch to further education tab
            await tabListItems[1].trigger('click');
            expect(wrapper.find('.ProfileTitleHeader').exists()).toBe(true);
            cv = wrapper.find('.ProfileContentCV');
            expect(cv.exists()).toBe(false);
            // statement should only be shown in personality tab
            statement = wrapper.find('.ProfileViewStatement');
            expect(statement.exists()).toBe(false);
            const furtherEducation = wrapper.find('.ProfileContentFurtherEducation');
            expect(furtherEducation.exists()).toBe(true);

            // switch to personality tab
            await tabListItems[2].trigger('click');
            expect(wrapper.find('.ProfileTitleHeader').exists()).toBe(true);
            cv = wrapper.find('.ProfileContentCV');
            expect(cv.exists()).toBe(false);
            // check the statement based on current test settings
            statement = wrapper.find('.ProfileViewStatement');
            expect(statement.exists()).toBe(hasProfileData && hasStatement);
            if (hasProfileData && hasStatement) {
                expect(statement.text()).toStrictEqual('STATEMENT');
            }
            personality = wrapper.find('.ProfileContentPersonality');
            expect(personality.exists()).toBe(true);
        });
    });
});
