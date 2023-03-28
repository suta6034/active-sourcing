<script setup lang="ts">
import {
    computed, ref, type Ref,
} from 'vue';
import { helpers, maxLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { userInfo } from '../../../../shared/composables/user-info';
import { useLang } from '../../../../shared/composables/i18n';
import { useApplicant } from '../../../../shared/composables/applicant';
import { BREAKPOINTS, useBreakpoint } from '../../../../shared/composables/breakpoint';
import { EVENTS, EVENTSPARAMETERS, tracking } from '../../../../../util/tracking/tracking';

import BaseBackNavigation from '../../../../shared/components/base/BaseBackNavigation.vue';
import BaseButton from '../../../../shared/components/base/BaseButton.vue';
import BaseErrorMessage from '../../../../shared/components/base/BaseErrorMessage.vue';
import BaseFormInput from '../../../../shared/components/base/BaseFormInput.vue';
import ApplicantApprovalAfterSending from './ApplicantApprovalAfterSending.vue';

import type { MessagingObject } from '../../../../shared/types/applicant/types';

const props = defineProps({
    isMessageSent: {
        type: Boolean,
        default: false,
    },
    isSendingSuccessful: {
        type: Boolean,
        default: true,
    },
});

const { t } = useLang();
const isSMScreen = useBreakpoint(BREAKPOINTS.sm);

const {
    applicantApprovalId,
    sendApprovalMessage,
} = useApplicant();

const backToSearch = () => {
    applicantApprovalId.value = '';
};

const messagingObject: Ref<MessagingObject> = ref({
    subject: '',
    body: '',
    companyId: userInfo.value?.company?.id,
    profileId: applicantApprovalId.value,
});

const isMessageSent: Ref<boolean> = ref(props.isMessageSent);
const isSendingSuccessful: Ref<boolean> = ref(props.isSendingSuccessful);

const send = async (): Promise<void> => {
    isMessageSent.value = true;
    isSendingSuccessful.value = await sendApprovalMessage(messagingObject.value);

  /* c8 ignore next 7 */
  if (isSendingSuccessful.value) {
    tracking({
      event: EVENTS.applicantRequestInformationSuccess,
      [EVENTSPARAMETERS.applicant_id]: applicantApprovalId.value,
      [EVENTSPARAMETERS.company_id]: userInfo.value?.company?.id,
    });
  }
};

const rules = computed(() => ({
    subject: {
        required: helpers.withMessage(
            () => `${t('validation', 'notEmptyField')}`,
            required,
        ),
        maxLength: helpers.withMessage(
            ({ $params }) => `${t('validation', 'maxLengthCharacters', { length: $params.max })}`,
            maxLength(1000),
        ),
    },
    body: {
        required: helpers.withMessage(
            () => `${t('validation', 'notEmptyField')}`,
            required,
        ),
        maxLength: helpers.withMessage(
            ({ $params }) => `${t('validation', 'maxLengthCharacters', { length: $params.max })}`,
            maxLength(5000),
        ),
    },
}));
const $v = useVuelidate(rules, messagingObject.value);

const isSendingValid = computed(() => $v.value.$errors.length === 0
&& messagingObject.value.subject !== '' && messagingObject.value.body !== '');

</script>
<template>
    <div
        class="ApplicantApprovalMessage relative ml-0 flex w-2/3 flex-col max-4xl:w-[66rem]"
        data-testid="ApplicantApprovalMessage"
        :class="{
            'ml-7 ' : isSMScreen,
            '!w-full ' : !isSMScreen
        }"
    >
        <BaseBackNavigation
            v-if="!isSMScreen"
            :text="t('button', 'back')"
            @back-navigation="backToSearch"
        />
        <template
            v-if="!isMessageSent"
        >
            <div
                class="MessageBody mb-2  flex h-full flex-col bg-white px-7 pt-7 max-md:px-6 max-md:pt-6"
            >
                <div class=" flex grow flex-col tracking-[-0.1px]">
                    <div class="HeaderBody mb-5 flex flex-col">
                        <div class="Header mb-2 text-h3 font-semiBold text-blue-900">
                            {{ t('label', 'approvalMessageHeader') }}
                        </div>
                        <div class="SubHeader h-full">
                            <div class="text-base text-blue-900">
                                {{ t('label', 'approvalMessageSubHeader') }}
                            </div>
                        </div>
                        <div class="Subject mt-5 flex h-full flex-col">
                            <div class="mb-2 h-[21px] text-small text-gray-600">
                                {{ t('label', 'subject') }}
                            </div>
                            <div class="h-9">
                                <BaseFormInput
                                    v-model="$v.subject.$model"
                                    group="MessageSubject"
                                    is-focused
                                    :error="$v.subject"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="TextareaBody">
                        <div class="mb-2 h-[21px] text-small text-gray-600">
                            {{ t('label', 'message') }}
                        </div>
                        <div class="h-[19rem]">
                            <textarea
                                v-model="$v.body.$model"
                                class="Textarea h-full w-full resize-none border bg-gray-50 p-4 tracking-[-0.1px]
                            text-blue-900 focus:outline-none"
                                :class="{
                                    'border-error': $v.body?.$errors.length > 0,
                                    'border-gray-300 focus-within:border-blue-900': !($v.body?.$errors.length > 0),
                                }"
                                name="message_body"
                                data-testid="Textarea"
                            />
                        </div>
                        <div v-if="$v.body?.$errors.length !== 0">
                            <BaseErrorMessage :message="$v.body?.$errors[0]?.$message"/>
                        </div>
                    </div>
                    <div class="Attachment mt-6 h-[4rem]">
                    <!-- Attachment -->
                    </div>
                </div>
            </div>
            <div
                class="
                        MessageFooter
                        shadow-top
                        flex
                        h-[80px]
                        w-full
                        shrink-0
                        items-center
                        justify-end
                        bg-white
                        pr-7"
            >
                <BaseButton
                    :primary="isSendingValid"
                    :disabled="!isSendingValid"
                    size="auto"
                    @click="isSendingValid ? send() : null"
                >
                    {{ t('label', 'sendRequest') }}
                </BaseButton>
            </div>
        </template>
        <template v-else>
            <ApplicantApprovalAfterSending :is-sending-successful="isSendingSuccessful"/>
        </template>
    </div>
</template>
