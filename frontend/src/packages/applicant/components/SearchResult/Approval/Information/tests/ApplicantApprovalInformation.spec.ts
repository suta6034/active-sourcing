import {
    describe, expect, flushPromises, it, render, screen, user, vi,
} from '../../../../../../../../tests/drivers/vitest/utils';

import ApplicantApprovalInformation from '../ApplicantApprovalInformation.vue';

import { useApplicant } from '../../../../../../shared/composables/applicant';

import type { ExperiencesEntry, ProfileData } from '../../../../../../shared/types/profile/types';
import { ProfileHelpers } from '../../../SearchResultDetail/Profile/ProfileContent/ProfileHelpers';

const {
    applicantApprovalId,
    applicantProfileData,
} = useApplicant();

const emptyProfileData: ProfileData = {
    availabilityId: 1,
    profileId: 12345,
    furtherEducations: [],
    preferredWorkplaces: [],
    objective: null,
    projectsAndAwards: [],
    readyToMove: false,
    experiences: [],
    languages: [],
    educations: [],
    skills: null,
    interests: [],
    aboutMe: '',
};

async function checkContentEntry(
    contentHeader: HTMLElement,
    expectedTitle: string,
    contentTestId: string,
    useKeyboard?: string,
) {
    expect(contentHeader.textContent).toStrictEqual(expectedTitle);
    expect(screen.queryByTestId(contentTestId)).toBe(null);
    await user.click(contentHeader);
    await screen.findByTestId(contentTestId);
    if (useKeyboard) {
        await user.keyboard(`{${useKeyboard}}`);
    } else {
        await user.click(contentHeader);
    }
    expect(screen.queryByTestId(contentTestId)).toBe(null);
}

describe('ApplicantApprovalInformation', () => {
    it.each([
        [false, false],
        [false, true],
        [true, false],
        [true, true],
    ])(
        'should only render the approval information if applicantApprovalId and profileData is set',
        (hasApplicantApprovalId, hasProfileData) => {
            applicantApprovalId.value = hasApplicantApprovalId ? '12345' : '';
            applicantProfileData.value = hasProfileData ? emptyProfileData : null;
            render(ApplicantApprovalInformation);
            const container = screen.queryByTestId('ApplicantApprovalInformation');

            expect(container === null).toBe(!(hasApplicantApprovalId && hasProfileData));
        },
    );

    it('should not display the approval information when clicking on the back button', async () => {
        applicantApprovalId.value = '12345';
        applicantProfileData.value = emptyProfileData;
        render(ApplicantApprovalInformation);
        await screen.findByTestId('ApplicantApprovalInformation');
        await screen.findByTestId('ApplicantApprovalInformationHeader');
        await screen.findByTestId('ProfileContentCV');
        const backButton = await screen.findByTestId('BaseBackNavigation button');
        await user.click(backButton);

        expect(applicantApprovalId.value).toStrictEqual('');
        expect(screen.queryByTestId('ApplicantApprovalInformation')).toBeNull();
    });

    it('should set the shadow to the back button when scrolling inside the container', async () => {
        applicantApprovalId.value = '12345';
        applicantProfileData.value = emptyProfileData;
        render(ApplicantApprovalInformation);
        const backButton = await screen.findByTestId('BaseBackNavigation');
        const contentContainer = await screen.findByTestId('ApplicantApprovalInformation ContentContainer');

        expect(backButton.classList.contains('shadow-bottom')).toBe(false);
        expect(backButton.classList.contains('z-10')).toBe(false);

        contentContainer.scrollTop = 50;
        contentContainer.dispatchEvent(new Event('scroll'));
        await flushPromises();

        expect(backButton.classList.contains('shadow-bottom')).toBe(true);
        expect(backButton.classList.contains('z-10')).toBe(true);

        contentContainer.scrollTop = 0;
        contentContainer.dispatchEvent(new Event('scroll'));
        await flushPromises();

        expect(backButton.classList.contains('shadow-bottom')).toBe(false);
        expect(backButton.classList.contains('z-10')).toBe(false);
    });

    it.each([
        [false, false, false, true, false, false],
        [false, false, true, false, false, false],
        [false, true, false, false, false, false],
        [true, false, false, false, false, false],
        [true, true, true, true, false, false],
        [true, true, true, true, false, true],
        [true, true, true, true, true, false],
    ])(
        'should only render the entries if the entries are actually filled',
        async (hasExperiences, skillsValid, hasLanguages, hasEducations, toggleEnter, toggleSpace) => {
            const experiences: Array<ExperiencesEntry> = [
                {
                    type: 'job',
                    attributes: {
                        id: 1,
                        title: 'JOB 1',
                    },
                },
                {
                    type: 'other',
                    attributes: {
                        id: 2,
                        title: 'OTHER 1',
                    },
                },
            ];
            const educations = [
                {
                    id: 1,
                    description: 'DESCRIPTION',
                    focus: 'FOCUS',
                    title: 'EDUCATION 1',
                    start: '01-01-2001',
                    end: null,
                    experienceMonths: 1,
                },
                {
                    id: 2,
                    description: 'DESCRIPTION',
                    focus: 'FOCUS',
                    title: 'EDUCATION 2',
                    start: '01-01-2001',
                    end: '02-02-2002',
                    experienceMonths: 12,
                },
            ];
            const languages = [
                { id: 1, levelId: 1 },
                { id: 2, levelId: 2 },
                { id: 3, levelId: 3 },
            ];
            const mockSkillsValid = vi.spyOn(ProfileHelpers, 'skillsValid').mockImplementation(() => skillsValid);
            const profileData: ProfileData = {
                availabilityId: 1,
                profileId: 12345,
                furtherEducations: [],
                preferredWorkplaces: [],
                projectsAndAwards: [],
                readyToMove: false,
                experiences: hasExperiences ? experiences : [],
                languages: hasLanguages ? languages : [],
                educations: hasEducations ? educations : [],
                skills: skillsValid ? {
                    basic: ['BASIC'],
                    advanced: ['ADVANCED'],
                    excellent: ['EXCELLENT'],
                } : null,
                objective: null,
                interests: [],
                aboutMe: '',
            };
            applicantProfileData.value = profileData;
            render(ApplicantApprovalInformation);
            const contentHeaders = screen.queryAllByTestId('ProfileContentMobileHeader');
            let contentHeadersCount = 0;
            let keyboardToggle = '';
            if (toggleEnter) keyboardToggle = 'enter';
            else if (toggleSpace) keyboardToggle = 'space';
            if (hasExperiences) {
                await checkContentEntry(
                    contentHeaders[contentHeadersCount],
                    'Berufserfahrung',
                    'ProfileContentCV Experiences',
                    keyboardToggle,
                );
                contentHeadersCount += 1;
            }
            if (skillsValid) {
                await checkContentEntry(
                    contentHeaders[contentHeadersCount],
                    'Kenntnisse',
                    'ProfileContentCV Skills',
                    keyboardToggle,
                );
                contentHeadersCount += 1;
            }
            if (hasLanguages) {
                await checkContentEntry(
                    contentHeaders[contentHeadersCount],
                    'Sprachen',
                    'ProfileContentCV Languages',
                    keyboardToggle,
                );
                contentHeadersCount += 1;
            }
            if (hasEducations) {
                await checkContentEntry(
                    contentHeaders[contentHeadersCount],
                    'Ausbildung',
                    'ProfileContentCV Education',
                    keyboardToggle,
                );
                contentHeadersCount += 1;
            }
            expect(contentHeaders.length).toStrictEqual(contentHeadersCount);
            mockSkillsValid.mockRestore();
        },
    );
});
