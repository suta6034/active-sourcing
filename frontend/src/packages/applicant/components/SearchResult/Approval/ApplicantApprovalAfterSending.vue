<script setup lang="ts">
import { useLang } from '../../../../shared/composables/i18n';

import BaseIllustration from '../../../../shared/components/base/BaseIllustration.vue';
import MessageSuccessIcon from '../../../../shared/assets/icons/MessageSuccessIcon.vue';

defineProps({
    isSendingSuccessful: {
        type: Boolean,
        default: true,
    },
});

const { t } = useLang();

</script>
<template>
    <div
        class="ApplicantApprovalAfterSending h-full w-full bg-white"
        data-testid="ApprovalAfterSending"
    >
        <template v-if="isSendingSuccessful">
            <div
                class="SuccessfulIllustraion mt-[8rem]"
                data-testid="SuccessfulIllustraion"
            >
                <div
                    class="mx-auto h-[260px] w-[220px]"
                >
                    <BaseIllustration
                        class="h-full w-full"
                        data-testid="success page"
                        :view-box="'0 0 220 290'"
                    >
                        <MessageSuccessIcon/>
                    </BaseIllustration>
                </div>
                <div class="mt-7 flex text-center max-md:mt-6">
                    <div
                        class="w-full"
                    >
                        <div class="text-lead font-semiBold mb-3 text-blue-900">
                            {{ t('notification', 'successfulSendingMessageLabel') }}
                        </div>
                        <div class="px-6 text-base text-blue-900">
                            {{ t('notification', 'successfulSendingMessageSublabel') }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div
                class="FailedIllustraion text-lead font-semiBold mt-[40%] text-center text-blue-900"
                data-testid="FailedIllustraion"
            >
                {{ t('notification', 'failedSendingMessageLabel') }}
            </div>
        </template>
    </div>
</template>
