import type { Meta, Story } from '@storybook/vue3';
import CheckboxIcon from '../../packages/shared/assets/icons/CheckboxIcon.vue';

export default {
    title: 'Icons/Checkbox',
    component: CheckboxIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { CheckboxIcon },
    setup() {
        return { args };
    },
    template: '<svg><CheckboxIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
