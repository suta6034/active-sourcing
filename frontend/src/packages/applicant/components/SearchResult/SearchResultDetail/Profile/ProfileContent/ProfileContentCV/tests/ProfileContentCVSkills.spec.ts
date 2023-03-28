import { flushPromises, mount } from '@vue/test-utils';
import {
    describe,
    expect, it, vi,
} from '../../../../../../../../../../tests/drivers/vitest/utils';
import ProfileContentCVSkills from '../ProfileContentCVSkills.vue';
import { ProfileHelpers } from '../../ProfileHelpers';

describe.each([[undefined], [{ basic: [], advanced: [], excellent: [] }]])('empty skills', (entries) => {
    it(`should not render the quick view skills when given entries are '${entries}'`, async () => {
        const wrapper = mount(ProfileContentCVSkills, {
            props: {
                entries,
            },
        });
        await flushPromises();
        const skillsContainer = wrapper.find('.ProfileSkillsContainer');
        expect(skillsContainer.exists()).toBe(false);
    });
});
it('should render the given skills', async () => {
    const entries = { basic: ['Basic Entry 1'], advanced: ['Advanced Entry 1'], excellent: ['Excellent Entry 1'] };
    const wrapper = mount(ProfileContentCVSkills, {
        props: {
            entries,
        },
    });
    await flushPromises();
    const skillsContainer = wrapper.find('.ProfileSkillsContainer');
    expect(skillsContainer.exists()).toBe(true);
    const skills = wrapper.findAll('.ProfileSkillsEntry');
    expect(skills.length).toBe(3);
    const moreButton = wrapper.find('.ProfileSkillsMoreButton');
    expect(moreButton.exists()).toBe(false);
});
it('should hide 3 skills in the beginning', async () => {
    const entries = {
        basic: ['Basic Entry 1', 'Basic Entry 2'],
        advanced: ['Advanced Entry 1', 'Advanced Entry 2'],
        excellent: ['Excellent Entry 1', 'Excellent Entry 2'],
    };
    const mockProfileSkillsLayout = vi.spyOn(ProfileHelpers.layout, 'getLastShownIndexOfSkills');
    mockProfileSkillsLayout.mockImplementation(() => 2);
    const wrapper = mount(ProfileContentCVSkills, {
        props: {
            entries,
        },
    });
    await flushPromises();
    // call flushPromises() twice. First call to wait for layout function to finish, second one for
    // dom to adapt to the layout changes
    await flushPromises();
    const skillsContainer = wrapper.find('.ProfileSkillsContainer');
    expect(skillsContainer.exists()).toBe(true);
    const skillEntriesContainer = wrapper.findAll('.ProfileSkillsEntry');
    expect(skillEntriesContainer.length).toBe(6);
    let skillEntries = wrapper.findAll('.ProfileSkills_BasePill');
    expect(skillEntries.length).toBe(3);
    let moreButton = wrapper.find('.ProfileSkillsMoreButton');
    expect(moreButton.exists()).toBe(true);
    expect(moreButton.text()).toStrictEqual('+ 3 weitere...');
    await moreButton.trigger('click');
    skillEntries = wrapper.findAll('.ProfileSkills_BasePill');
    expect(skillEntries.length).toBe(6);
    moreButton = wrapper.find('.ProfileSkillsMoreButton');
    expect(moreButton.exists()).toBe(true);
    expect(moreButton.text()).toStrictEqual('weniger...');
    mockProfileSkillsLayout.mockRestore();
});
