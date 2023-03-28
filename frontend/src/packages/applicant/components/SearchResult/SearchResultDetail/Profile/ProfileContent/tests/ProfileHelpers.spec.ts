import type { ExperiencesEntry } from '@/packages/shared/types/profile/types';
import {
    describe,
    expect, it, vi,
} from '../../../../../../../../../tests/drivers/vitest/utils';
import { ProfileHelpers } from '../ProfileHelpers';

describe('Skills', () => {
    it('should return 0 if skills and skillElements are empty and if container is not set', () => {
        expect(ProfileHelpers.layout.getLastShownIndexOfSkills([])).toBe(0);
        expect(ProfileHelpers.layout.getLastShownIndexOfSkills([], null)).toBe(0);
        expect(ProfileHelpers.layout.getLastShownIndexOfSkills([document.createElement('div')], null)).toBe(0);
    });
    it('should calculate the last visible index', () => {
        const container = document.createElement('div');
        Object.defineProperty(container, 'clientHeight', {
            value: 300,
        });
        const skillElements: Array<HTMLElement> = [];
        for (let idx = 0; idx < 10; idx += 1) {
            const el = document.createElement('span');
            Object.defineProperty(el, 'clientHeight', {
                value: 25,
            });
            vi.spyOn(el, 'getBoundingClientRect').mockImplementation(() => ({
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                bottom: (idx + 1) * 25,
                right: 0,
            } as DOMRect));
            skillElements.push(el);
        }
        expect(ProfileHelpers.layout.getLastShownIndexOfSkills(skillElements, container)).toBe(2);
    });
});
describe('normalizeExperienceEntries', () => {
    it('should normalize the given experiences to flat entries', () => {
        const flatEntries = [{
            type: 'other',
            id: 1,
            title: 'Test Entry',
            institution: 'Test Institution',
            description: null,
            jobFieldId: null,
            experienceMonths: 10,
            experienceTypeId: 2,
            start: '2022-01-01T00:00:00+01:00',
            end: null,
        }];
        const entries: ExperiencesEntry[] = [{
            type: 'other',
            attributes: {
                id: 1,
                title: 'Test Entry',
                institution: 'Test Institution',
                description: null,
                jobFieldId: null,
                experienceMonths: 10,
                experienceTypeId: 2,
                start: '2022-01-01T00:00:00+01:00',
                end: null,
            },

        }];
        expect(ProfileHelpers.normalizeExperienceEntries(entries)).toStrictEqual(flatEntries);
    });
});
