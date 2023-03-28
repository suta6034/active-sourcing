import {
    expect, it, render, screen, user,
} from '../../../../../../../../tests/drivers/vitest/utils';

import ProfileTitleHeader from '../ProfileTitleHeader.vue';
import type { ProfileData } from '../../../../../../shared/types/profile/types';

const mockApplicantProfileData: ProfileData = {
    availabilityId: 1,
    preferredWorkplaces: [
        'Graz',
        'Wien',
        'Graz und Umgebung',
        'Wien und Umgebung',
    ],
    profileId: 0,
    readyToMove: false,
    statement: 'Test Statement',
    experiences: [{
        type: 'job',
        attributes: {
            id: 1,
            title: 'Tester',
            description: '',
            jobFieldId: 1,
            experienceMonths: 59,
            start: '2016-03-01T00:00:00+01:00',
            end: null,
        },
    }],
    skills: {
        basic: [],
        advanced: [],
        excellent: [],
    },
    objective: {
        employmentTypeIds: [],
        jobs: [],
        salary: 0,
    },
    languages: [],
    educations: [],
    interests: [],
    aboutMe: '',
    furtherEducations: [],
    projectsAndAwards: [],
};

it('should render quick view and show more preferred workplaces', async () => {
    render(ProfileTitleHeader, {
        props: {
            applicantProfileData: mockApplicantProfileData,
        },
    });

    expect(await screen.findByTestId('ProfileMorePreferredWorkplaces')).toBeInTheDocument();
    const moreWorkplacesText = await screen.findByTestId('ProfileMorePreferredWorkplaces');
    await user.click(moreWorkplacesText);
    expect(await screen.findByTestId('ProfileMorePreferredWorkplacesBox')).toBeInTheDocument();
});
