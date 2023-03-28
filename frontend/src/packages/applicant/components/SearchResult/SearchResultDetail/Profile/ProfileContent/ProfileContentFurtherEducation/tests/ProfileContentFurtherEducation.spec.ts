import { mount } from '@vue/test-utils';
import type {
    ProjectsAndAwardsEntry,
    QuickViewTimeLineEntry,
} from '../../../../../../../../shared/types/profile/types';

import {
    expect, it, describe, type GenericWrapper,
} from '../../../../../../../../../../tests/drivers/vitest/utils';

import ProfileContentFurtherEducation from '../ProfileContentFurtherEducation.vue';

describe('normalizeEntries()', () => {
    it('should normalize given entries to be flat', async () => {
        const flatEntries = [{
            type: 'project',
            id: 1,
            title: 'Test Entry',
            description: 'project desc',
            start: '2022-01-01T00:00:00+01:00',
            end: '2022-01-01T00:00:00+02:00',
            url: {
                value: 'test/project',
                hidden: false,
            },
        }];
        const entries: ProjectsAndAwardsEntry[] = [{
            type: 'project',
            attributes: {
                id: 1,
                title: 'Test Entry',
                url: {
                    value: 'test/project',
                    hidden: false,
                },
                description: 'project desc',
                start: '2022-01-01T00:00:00+01:00',
                end: '2022-01-01T00:00:00+02:00',
            },

        }];
        const wrapper: GenericWrapper<Partial<{
            normalizeEntries: (targetArray: ProjectsAndAwardsEntry[]) => QuickViewTimeLineEntry[]
        }>> = mount(ProfileContentFurtherEducation);
        expect(wrapper.vm.normalizeEntries?.(entries)).toStrictEqual(flatEntries);
    });
});
