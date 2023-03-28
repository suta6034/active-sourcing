import type { Meta, Story } from '@storybook/vue3';
import BurgerIcon from '../../packages/shared/assets/icons/BurgerIcon.vue';

export default {
    title: 'Icons/Burger',
    component: BurgerIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BurgerIcon },
    setup() {
        return { args };
    },
    template: '<svg><BurgerIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
