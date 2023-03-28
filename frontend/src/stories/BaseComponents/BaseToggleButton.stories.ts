import type { Meta, Story } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import BaseToggleButton from '../../packages/shared/components/base/BaseToggleButton.vue';

export default {
    title: 'Base Components/Toggle Button',
    component: BaseToggleButton,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseToggleButton },
    setup() {
        return { args };
    },
    methods: {
        toggle: action('toggle'),
    },
    template: '<BaseToggleButton @toggle="toggle" v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};

export const InitialToggled: Story = Template.bind({});
InitialToggled.args = {
    state: true,
};

export const WithLabelText: Story = Template.bind({});
WithLabelText.args = {
    labelText: 'Lorem ipsum dolor sit amet',
};

export const InitialToggledWithLabel: Story = Template.bind({});
InitialToggledWithLabel.args = {
    state: true,
    labelText: 'Lorem ipsum dolor sit amet',
};
