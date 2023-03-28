import type { Meta, Story } from '@storybook/vue3';
import BaseNumericInput from '../../packages/shared/components/base/BaseNumericInput.vue';

export default {
    title: 'Base Components/Numeric Input',
    component: BaseNumericInput,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseNumericInput },
    setup() {
        return { args };
    },
    template: '<BaseNumericInput v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};

export const Placeholder: Story = Template.bind({});
Placeholder.args = {
    placeholder: '100',
};

export const Disabled: Story = Template.bind({});
Disabled.args = {
    isDisabled: true,
};

export const CursorPointer: Story = Template.bind({});
CursorPointer.args = {
    cursorPointer: true,
};

export const PresetValue: Story = Template.bind({});
PresetValue.args = {
    value: 12345,
};

export const PresetValueWithPlaceholder: Story = Template.bind({});
PresetValueWithPlaceholder.args = {
    placeholder: '12345',
    value: 12345,
};

export const MinimumValueSet: Story = Template.bind({});
MinimumValueSet.args = {
    min: 10,
};

export const UnitSymbol: Story = Template.bind({});
UnitSymbol.args = {
    unit: true,
};

export const RequiredNoDefaultValue: Story = Template.bind({});
RequiredNoDefaultValue.args = {
    required: true,
};

export const RequiredWithDefaultValue: Story = Template.bind({});
RequiredWithDefaultValue.args = {
    required: true,
    defaultValue: 12345,
};

export const RequiredWithInitValue: Story = Template.bind({});
RequiredWithInitValue.args = {
    required: true,
    value: 100,
    defaultValue: 12345,
};

export const WithError: Story = Template.bind({});
WithError.args = {
    error: true,
};
