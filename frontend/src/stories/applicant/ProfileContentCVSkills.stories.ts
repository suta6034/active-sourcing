import type { Meta, Story } from '@storybook/vue3';
// eslint-disable-next-line max-len
import ProfileContentCVSkills from '../../packages/applicant/components/SearchResult/SearchResultDetail/Profile/ProfileContent/ProfileContentCV/ProfileContentCVSkills.vue';

export default {
    title: 'Applicant Info/Skills',
    component: ProfileContentCVSkills,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ProfileContentCVSkills },
    setup() {
        return { args };
    },
    template: '<div class="w-[550px] max-w-[550px]"><ProfileContentCVSkills v-bind="args"/></div>',
});

export const TwoLines: Story = Template.bind({});
TwoLines.args = {
    entries: {
        basic: ['Basic Entry 1', 'Basic Entry 2'],
        advanced: ['Advanced Entry 1'],
        excellent: ['Excellent Entry 1'],
    },
};

export const ThreeLines: Story = Template.bind({});
ThreeLines.args = {
    entries: {
        basic: ['Basic Entry 1', 'Basic Entry 2'],
        advanced: ['Advanced Entry 1'],
        excellent: ['Excellent Entry 1', 'Excellent Entry 2', 'Excellent Entry 3'],
    },
};

export const MoreThanThreeLines: Story = Template.bind({});
MoreThanThreeLines.args = {
    entries: {
        basic: ['Basic Entry 1', 'Basic Entry 2'],
        advanced: ['Advanced Entry 1', 'Advanced Entry 2', 'Advanced Entry 3', 'Advanced Entry 4'],
        excellent: ['Excellent Entry 1', 'Excellent Entry 2', 'Excellent Entry 3'],
    },
};

export const ReallyLongEntry: Story = Template.bind({});
ReallyLongEntry.args = {
    entries: {
        basic: ['Basic Entry 1', 'Basic Entry 2'],
        advanced: ['Advanced Entry 1', 'Advanced Entry 2', 'Advanced Entry 3', 'Advanced Entry 4'],
        excellent: ['Excellent Entry 1',
            'Excellent Entry with a really long text which can not fit in one line so it should be truncated',
            'Excellent Entry 2', 'Excellent Entry 3'],
    },
};
