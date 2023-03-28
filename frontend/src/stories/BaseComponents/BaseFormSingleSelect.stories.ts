import type { Meta, Story } from '@storybook/vue3';
import BaseFormSingleSelect from '../../packages/shared/components/base/BaseFormSingleSelect.vue';

export default {
    title: 'Base Components/Single Select',
    component: BaseFormSingleSelect,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseFormSingleSelect },
    setup() {
        return { args };
    },
    template: '<BaseFormSingleSelect v-bind="args"/>',
});

const testEntries = [
    { id: 1, label: 'Entry 1' },
    { id: 2, label: 'Entry 2' },
    { id: 3, label: 'Entry 3' },
    { id: 4, label: 'Entry 4' },
    { id: 5, label: 'Entry 5' },
    { id: 6, label: 'Entry 6' },
    { id: 7, label: 'Entry 7' },
    { id: 8, label: 'Entry 8' },
    { id: 9, label: 'Entry 9' },
    { id: 10, label: 'Entry 10' },
    { id: 11, label: 'Entry 11' },
    { id: 12, label: 'Entry 12' },
    { id: 13, label: 'Entry 13' },
    { id: 14, label: 'Entry 14' },
    { id: 15, label: 'Entry 15' },
];

export const Default: Story = Template.bind({});
Default.args = {
    label: 'Single Select',
    entries: testEntries,
    formLabel: 'Form Label',
};
