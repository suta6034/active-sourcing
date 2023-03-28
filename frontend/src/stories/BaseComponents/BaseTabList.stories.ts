import type { Meta, Story } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import BaseTabList from '../../packages/shared/components/base/BaseTabList.vue';

export default {
    title: 'Base Components/Tab List',
    component: BaseTabList,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseTabList },
    setup() {
        return { args };
    },
    methods: {
        tabClick: action('tabClick'),
    },
    template: '<BaseTabList @tabClick="tabClick" v-bind="args"/>',
});

const tabs = [
    {
        label: 'Label 1',
        id: 1,
        disabled: false,
        active: false,
    },
    {
        label: 'Label 2',
        id: 2,
        disabled: false,
        active: true,
    },
    {
        label: 'Label 3',
        id: 3,
        disabled: false,
        active: false,
    },
    {
        label: 'Label 4',
        id: 4,
        disabled: true,
        active: false,
    },
];

export const Default: Story = Template.bind({});
Default.args = {
    tabs,
};
