import type { Meta, Story } from '@storybook/vue3';
import SearchCandidateIcon from '../../packages/shared/assets/icons/SearchCandidateIcon.vue';

export default {
    title: 'Icons/SearchCandidate',
    component: SearchCandidateIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { SearchCandidateIcon },
    setup() {
        return { args };
    },
    template: '<svg><SearchCandidateIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
