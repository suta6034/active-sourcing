<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';

import { useLang } from '../../../../shared/composables/i18n';
import { useApplicant } from '../../../../shared/composables/applicant';

import ApplicantSearchResultItemList from './SearchResultListItem/ApplicantSearchResultItemList.vue';
import BaseFormSingleSelect from '../../../../shared/components/base/BaseFormSingleSelect.vue';

import type { Applicant, Applicants } from '../../../../shared/types/applicant/types';

const { t } = useLang();

const {
    applicantSearchData,
} = useApplicant();

const emit = defineEmits(['onSelectListItem']);

defineProps({
    applicants: {
        type: Object as () => Applicants<Applicant[]>,
        default: null,
    },
});

const isShowSort = ref(false);
const sortResultContainerRef = ref(null);

const closeSortDropdown = () => {
    isShowSort.value = false;
};

onClickOutside(sortResultContainerRef, () => {
    if (!isShowSort.value) return;
    closeSortDropdown();
});

const resultContainer: Ref<HTMLElement | null> = ref(null);

watch(() => applicantSearchData.value.isNewSearch, (newValue: boolean) => {
    if (newValue) {
        setTimeout(() => {
            if (resultContainer.value) {
                resultContainer.value.scrollTop = 0;
            }
            applicantSearchData.value.isNewSearch = false;
        }, 0);
    }
});

</script>
<template>
    <div
        class="ApplicantSearchList flex w-full shrink-0 flex-col 2xl:w-auto"
        data-testid="ApplicantSearchList"
    >
        <div class="mb-4 ml-5 mt-5 font-semiBold 2xl:ml-0 2xl:mt-0">
            {{ applicants?.data?.length === 0 ? '0' : applicants.meta?.pagination?.total }}
            {{ t('label','candidatesFound') }}
        </div>
        <div
            class="ApplicantSearchListSort flex max-h-7 items-center justify-end 2xl:mr-0"
            data-testid="ApplicantSearchList dropdown"
        >
            <BaseFormSingleSelect
                :label="t('label','sort')"
                width="w-fit"
                :is-toggle="true"
                :offset-top="-10"
                :offset-right="12"
                :fit-content="true"
                :entries="[{ id: 0, label: t('label', 'relevance') }, { id: 1, label: t('label', 'actuality') }]"
            />
        </div>
        <div
            ref="resultContainer"
            class="overflow-auto"
        >
            <ApplicantSearchResultItemList
                :applicants="applicants"
                @on-select-list-item="emit('onSelectListItem', $event)"
            />
        </div>
    </div>
</template>
