import type { Meta, Story } from '@storybook/vue3';
import DustbinIcon from '../../packages/shared/assets/icons/DustbinIcon.vue';

export default {
    title: 'Icons/Dustbin',
    component: DustbinIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { DustbinIcon },
    setup() {
        return { args };
    },
    template: '<svg class="mt-[36px] stroke-gray-400 cursor-pointer'
    + 'hover:stroke-blue-900 group-focus:stroke-blue-900"><DustbinIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
