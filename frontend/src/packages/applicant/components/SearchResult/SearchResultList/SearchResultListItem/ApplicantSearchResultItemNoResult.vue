<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { useLang } from '../../../../../shared/composables/i18n';

import BaseNotificationBox from '../../../../../shared/components/base/BaseNotificationBox.vue';

const {
    t,
} = useLang();

const hints: Ref<Array<string>> = ref([
    'noResultViewHintSearchResult',
    'noResultViewHintSemantic',
    'noResultViewHintFilter',
    'noResultViewHintProfile',
]);
</script>
<template>
    <BaseNotificationBox
        class="
            ApplicantSearchResultItemNoResult
            h-64
            w-full
            rounded-sm
            p-3
            2xl:w-[480px]
            2xl:p-6
            "
        type="info"
        data-testid="ApplicantSearchResultItemNoResult"
    >
        <div>
            <div class="Header">
                {{ t('notification', 'noResultViewHeader') }}
                <span class="font-semiBold">
                    {{ t('notification', 'noResultViewHeaderCandidate') }}
                </span>
                {{ t('notification', 'noResultViewHeaderSearchResult') }}
            </div>
            <div class="noResultAdvices mt-[15px]">
                <p class="listHeading">
                    <span>{{ t('notification', 'noResultViewListHeader') }}</span>
                </p>
                <ul class="mt-2">
                    <li
                        v-for="hint in hints"
                        :key="hint"
                        class="mt-2 flex before:mt-2 before:mr-3
                             before:text-tiny before:text-yellow before:content-['•']"
                    >
                        <span>{{ t('notification', hint) }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </BaseNotificationBox>
</template>
