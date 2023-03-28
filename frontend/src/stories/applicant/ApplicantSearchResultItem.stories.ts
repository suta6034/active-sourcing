import type { Meta, Story } from '@storybook/vue3';
// eslint-disable-next-line max-len
import ApplicantSearchResultItem from '../../packages/applicant/components/SearchResult/SearchResultList/SearchResultListItem/ApplicantSearchResultItem.vue';

export default {
    title: 'Applicant Profile/Search Result Item',
    component: ApplicantSearchResultItem,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantSearchResultItem },
    setup() {
        return { args };
    },
    template: '<div style="width: 520px; height: 285px; padding: 20px; background-color: gray;">'
        + '<ApplicantSearchResultItem v-bind="args"/>'
        + '</div>',
});

export const Default: Story = Template.bind({});
Default.args = {
    currentJobTitle: 'This is an example of a really long Job Title that is quite useless',
    workExperience: 98,
    jobField: 'Pharma Gesundheit & Soziales',
    location: 'Graz',
    readyToMove: true,
    objectiveJob: 'Software Tester',
};

export const Empty: Story = Template.bind({});
Empty.args = {};

export const NotReadyToMove: Story = Template.bind({});
NotReadyToMove.args = {
    currentJobTitle: 'This is an example of a really long Job Title that is quite useless',
    workExperience: 98,
    jobField: 'Pharma Gesundheit & Soziales',
    location: 'Graz',
    readyToMove: false,
    objectiveJob: 'Software Tester',
};

export const OneMonthExperience: Story = Template.bind({});
OneMonthExperience.args = {
    currentJobTitle: 'This is an example of a really long Job Title that is quite useless',
    workExperience: 1,
    jobField: 'Pharma Gesundheit & Soziales',
    location: 'Graz',
    readyToMove: true,
    objectiveJob: 'Software Tester',
};

export const OneYearExperience: Story = Template.bind({});
OneYearExperience.args = {
    currentJobTitle: 'This is an example of a really long Job Title that is quite useless',
    workExperience: 12,
    jobField: 'Pharma Gesundheit & Soziales',
    location: 'Graz',
    readyToMove: true,
    objectiveJob: 'Software Tester',
};

export const IsPending: Story = Template.bind({});
IsPending.args = {
    currentJobTitle: 'This is an example of a really long Job Title that is quite useless',
    workExperience: 98,
    jobField: 'Pharma Gesundheit & Soziales',
    location: 'Graz',
    readyToMove: true,
    objectiveJob: 'Software Tester',
    isPending: true,
};
