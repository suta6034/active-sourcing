import type { Meta, Story } from '@storybook/vue3';
import XListIcon from '../../packages/shared/assets/icons/XListIcon.vue';

export default {
    title: 'Icons/X',
    component: XListIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { XListIcon },
    setup() {
        return { args };
    },
    template: '<svg><XListIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
