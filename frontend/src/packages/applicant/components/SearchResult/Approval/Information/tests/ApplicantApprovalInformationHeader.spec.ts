import {
    describe, expect, it, render, screen, vi,
} from '../../../../../../../../tests/drivers/vitest/utils';

import * as FilterComposable from '../../../../../../shared/composables/filter';

import ApplicantApprovalInformationHeader from '../ApplicantApprovalInformationHeader.vue';

import type { ExperiencesEntry, ProfileData } from '../../../../../../shared/types/profile/types';

describe.each([
    [false, false, false, false, false, false],
    [false, true, false, false, false, false],
    [true, false, false, false, false, false],
    [true, false, false, false, false, true],
    [true, true, false, false, false, true],
    [true, false, true, false, false, true],
    [true, false, true, false, true, true],
    [true, false, true, true, false, true],
    [true, false, true, true, true, true],
    [true, true, true, false, false, true],
    [true, true, true, false, true, true],
    [true, true, true, true, false, true],
    [true, true, true, true, true, true],
])(
    'ApplicantApprovalInformationHeader',
    (hasProfileData, hasLocations, hasObjective, hasEmploymentTypeIds, hasSalary, hasExperiences) => {
        it(`where profileData is ${hasProfileData ? 'set' : 'unset'},
    locations is ${hasLocations ? 'set' : 'unset'}, objective is ${hasObjective ? 'set' : 'unset'},
    objectives.employmentTypeIds is ${hasEmploymentTypeIds ? 'set' : 'unset'},
    objectives.salary is ${hasSalary ? 'set' : 'unset'}`, async () => {
            const origUseFilter = FilterComposable.useFilter();
            const mockGetLabelForFilter = vi.fn((filterName: string, id: string | number) => {
                if (filterName === 'employmentTypes') {
                    if (id === 3960) return 'Vollzeit';
                    if (id === 3961) return 'Teilzeit';
                }
                return '';
            });
            const mockUseFilter = vi.spyOn(FilterComposable, 'useFilter').mockImplementation(() => ({
                ...origUseFilter,
                getLabelForFilter: mockGetLabelForFilter,
            }));
            const objectve = {
                employmentTypeIds: hasEmploymentTypeIds ? [3960, 3961] : [],
                jobs: ['Unit Test Dream Job'],
                salary: hasSalary ? 9999 : null,
            };
            const experiences: Array<ExperiencesEntry> = [{
                type: 'other',
                attributes: {
                    id: 1,
                    title: 'EXPERIENCE',
                },
            }];
            const profileData: ProfileData = {
                availabilityId: 1,
                furtherEducations: [],
                preferredWorkplaces: [],
                profileId: 12345,
                projectsAndAwards: [],
                readyToMove: false,
                statement: undefined,
                experiences: hasExperiences ? experiences : [],
                languages: [],
                educations: [],
                skills: null,
                objective: hasObjective ? objectve : null,
                interests: [],
                aboutMe: '',
            };
            const locations = [{ id: 2429, label: 'Niederösterreich' }, { id: 2430, label: 'Wien' }];
            render(ApplicantApprovalInformationHeader, {
                props: {
                    profileId: '12345',
                    profileData: hasProfileData ? profileData : undefined,
                    locations: hasLocations ? locations : undefined,
                },
            });
            await screen.findByTestId('profile locked avatar');
            const jobTitle = await screen.findByTestId('ApplicantApprovalInformationHeader JobTitle');
            expect(jobTitle.textContent).toStrictEqual(hasProfileData && hasExperiences ? 'EXPERIENCE' : '');
            const profileID = await screen.findByTestId('ApplicantApprovalInformationHeader ProfileID');
            expect(profileID.textContent).toStrictEqual('Profil ID: 12345');

            const workplaces = screen.queryByTestId('ProfileWorkplaces');
            expect(workplaces === null).toBe(!hasLocations);
            const mapIcon = screen.queryByTestId('ProfileWorkplaces MapIcon');
            expect(mapIcon === null).toBe(!hasLocations);
            const firstLocation = screen.queryByTestId('ProfileWorkplaces FirstLocation');
            expect(firstLocation === null).toBe(!hasLocations);
            expect(firstLocation?.textContent || '').toStrictEqual(hasLocations ? 'Niederösterreich, +1 weitere' : '');
            const readyToMove = screen.queryByTestId('ProfileWorkplaces ReadyToMove');
            expect(readyToMove).toBeNull();
            const employmentTypes = screen.queryByTestId('ProfileEmploymentType');
            expect(employmentTypes === null).toBe(!(hasObjective && hasEmploymentTypeIds));
            expect(employmentTypes?.textContent || '')
                .toStrictEqual(hasObjective && hasEmploymentTypeIds ? 'Vollzeit, Teilzeit' : '');
            mockUseFilter.mockRestore();
            const salary = await screen.findByTestId('ProfileSalary');
            expect(salary.textContent)
                .toStrictEqual(hasObjective && hasSalary ? 'Wunschgehalt: € 9.999' : 'Wunschgehalt: Nicht angegeben');
        });
    },
);
