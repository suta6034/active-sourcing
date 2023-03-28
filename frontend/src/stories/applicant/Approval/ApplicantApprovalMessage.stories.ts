import type { Meta, Story } from '@storybook/vue3';

import ApplicantApprovalMessage from '../../../packages/applicant/components/SearchResult/Approval/ApplicantApprovalMessage.vue';

export default {
    title: 'Applicant Approval/Sending message',
    component: ApplicantApprovalMessage,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantApprovalMessage },
    setup() {
        return { args };
    },
    template: '<ApplicantApprovalMessage v-bind="args"/>',
});

export const SendingMessageLayout: Story = Template.bind({});
SendingMessageLayout.args = {
    isMessageSent: false,
    isSendingSuccessful: true,
};

export const SuccessfulSending: Story = Template.bind({});
SuccessfulSending.args = {
    isMessageSent: true,
    isSendingSuccessful: true,
};

export const FailedSending: Story = Template.bind({});
FailedSending.args = {
    isMessageSent: true,
    isSendingSuccessful: false,
};
