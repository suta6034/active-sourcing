import type { Meta, Story } from '@storybook/vue3';
import BaseButton from '../../packages/shared/components/base/BaseButton.vue';

export default {
    title: 'Base Components/Button',
    component: BaseButton,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseButton },
    setup() {
        return { args };
    },
    template: `<BaseButton ${args.properties} v-bind="args">BaseButton</BaseButton>`,
});

export const NoProperties = Template.bind({});
NoProperties.args = {
    properties: '',
};

export const PredefinedClass = Template.bind({});
PredefinedClass.args = {
    properties: 'class="bg-green-400 hover:bg-gray-400"',
};

export const Primary = Template.bind({});
Primary.args = {
    properties: '',
    primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
    properties: '',
    secondary: true,
};

export const Navigation = Template.bind({});
Navigation.args = {
    properties: '',
    navigation: true,
};

export const Large = Template.bind({});
Large.args = {
    properties: 'class="bg-green-400 hover:bg-gray-400"',
    size: 'l',
};

export const Small = Template.bind({});
Small.args = {
    properties: 'class="bg-green-400 hover:bg-gray-400"',
    size: 's',
};

export const NavigationSmall = Template.bind({});
NavigationSmall.args = {
    properties: '',
    size: 's',
    navigation: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    properties: 'class="bg-green-400 hover:bg-gray-400"',
    iconName: 'Filter',
    size: 'l',
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
    properties: '',
    iconName: 'Filter',
    size: 'l',
    primary: true,
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
    properties: '',
    iconName: 'Filter',
    size: 'l',
    secondary: true,
};

export const CustomIconSize = Template.bind({});
CustomIconSize.args = {
    properties: '',
    iconName: 'Filter',
    size: 'l',
    primary: true,
    iconWidth: 15,
    iconHeight: 15,
};
