import type { Meta, Story } from '@storybook/vue3';
import BaseInitials from '../../packages/shared/components/base/BaseInitials.vue';

export default {
    title: 'Base Components/Initials',
    component: BaseInitials,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseInitials },
    setup() {
        return { args };
    },
    template: '<BaseInitials v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {
    initials: 'MM',
    img: "https://static.staging.karriere.at/company-user/1984201/3570075/dragon-donkey.jpeg",
};

export const Small: Story = Template.bind({});
Small.args = {
    initials: 'MM',
    img: "https://static.staging.karriere.at/company-user/1984201/3570075/dragon-donkey.jpeg",
    small: true,
};

export const withoutImg: Story = Template.bind({});
withoutImg.args = {
    initials: 'MM',
    small: true,
};