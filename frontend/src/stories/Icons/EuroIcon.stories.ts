import type { Meta, Story } from '@storybook/vue3';
import EuroIcon from '../../packages/shared/assets/icons/EuroIcon.vue';

export default {
    title: 'Icons/Euro',
    component: EuroIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { EuroIcon },
    setup() {
        return { args };
    },
    template: '<svg><EuroIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
