import { flushPromises, mount } from '@vue/test-utils';
import * as ApplicantService from '../../../../repositories/applicant-repository';
import { useApplicant } from '../../../../../shared/composables/applicant';
import type { ProfileData } from '../../../../../shared/types/profile/types';
import {
    describe,
    expect, it, vi,
} from '../../../../../../../tests/drivers/vitest/utils';
import StandAlone from '../StandAlone.vue';

const { standAloneApplicantId } = useApplicant();

describe('Standalone view of applicant', () => {
    describe.each([['', '38383jdkd', 'null', 'undefined']])('invalid standAloneApplicantId', (value) => {
        it(`should not call getProfileData if the standAloneApplicantId is '${value}'`, async () => {
            const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
                .mockImplementation(() => Promise.resolve(null));
            standAloneApplicantId.value = value;
            const wrapper = mount(StandAlone, {
                props: {},
            });
            await flushPromises();
            expect(mockgetProfileData).toBeCalledTimes(0);
            expect(wrapper.find('.ProfileView').exists()).toBe(false);
            expect(wrapper.find('.NoResult').exists()).toBe(true);
        });
    });
    it('should render the "No-Result"-Icon if the applicant id is invalid', async () => {
        const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
            .mockImplementation(() => Promise.resolve(null));
        standAloneApplicantId.value = '1234';
        const wrapper = mount(StandAlone, {
            props: {},
        });
        await flushPromises();
        expect(mockgetProfileData).toBeCalledTimes(1);
        expect(wrapper.find('.ProfileView').exists()).toBe(false);
        expect(wrapper.find('.NoResult').exists()).toBe(true);
    });
    it('should render the quick view of the found applicant', async () => {
        const mockgetProfileData = vi.spyOn(ApplicantService, 'getProfileData')
            .mockImplementation(() => {
                const qvd: ProfileData = {
                    availabilityId: 1,
                    preferredWorkplaces: [],
                    profileId: 10,
                    readyToMove: false,
                    experiences: [],
                    skills: {
                        basic: [],
                        advanced: [],
                        excellent: [],
                    },
                    objective: null,
                    languages: [],
                    educations: [],
                    furtherEducations: [],
                    projectsAndAwards: [],
                    interests: [],
                    aboutMe: '',
                };
                return Promise.resolve(qvd);
            });
        standAloneApplicantId.value = '1234';
        const wrapper = mount(StandAlone, {
            props: {},
        });
        await flushPromises();
        expect(mockgetProfileData).toBeCalledTimes(1);
        expect(wrapper.find('.ProfileView').exists()).toBe(true);
        expect(wrapper.find('.NoResult').exists()).toBe(false);
    });
});
