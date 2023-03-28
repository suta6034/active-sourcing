<script setup lang="ts">
import type { Applicant, Applicants } from '../../../../../shared/types/applicant/types';

import { useFilter } from '../../../../../shared/composables/filter';
import { useLang } from '../../../../../shared/composables/i18n';
import { useApplicant } from '../../../../../shared/composables/applicant';

import ApplicantSearchResultItem from './ApplicantSearchResultItem.vue';
import ApplicantSearchResultItemNoResult from './ApplicantSearchResultItemNoResult.vue';
import BaseButton from '../../../../../shared/components/base/BaseButton.vue';
import BaseLoadingDots from '../../../../../shared/components/base/BaseLoadingDots.vue';

const {
    getLabelForFilter,
    filter,
} = useFilter();

const {
    getNextPage,
    applicantSearchData,
} = useApplicant();

const {
    t,
} = useLang();

const emit = defineEmits(['onSelectListItem']);

defineProps({
    applicants: {
        type: Object as () => Applicants<Applicant[]>,
        default: null,
    },
});
</script>

<template>
    <template v-if="applicants.data.length === 0">
        <ApplicantSearchResultItemNoResult/>
    </template>
    <template v-else>
        <div
            v-for="applicant in applicants?.data"
            :key="applicant.id"
            class="ApplicantSearchResultItemList mt-3 first:mt-0"
            data-testid="ApplicantSearchResultItemList"
        >
            <ApplicantSearchResultItem
                :id="applicant.id"
                :current-job-title="applicant.attributes.lastPosition?.title"
                :work-experience="applicant.attributes.lastPosition?.experienceMonths"
                :job-field="applicant.attributes.lastPosition?.jobFieldId
                    ? getLabelForFilter('jobFields', applicant.attributes.lastPosition?.jobFieldId)
                    : undefined"
                :location="applicant.attributes.objective?.location?.preferredWorkplaces"
                :ready-to-move="applicant.attributes.objective?.location?.readyToMove"
                :objective-job="applicant.attributes.objective?.jobs?.length
                    ? applicant.attributes.objective.jobs[0]
                    : undefined"
                @on-select-list-item="emit('onSelectListItem', $event)"
            />
        </div>
        <div
            v-if="applicantSearchData.currentItems < applicantSearchData.total"
            class=" w-full px-5 py-7 2xl:pt-7"
        >
            <BaseButton
                :secondary="true"
                size="full"
                :padding-x="applicantSearchData.isLoading ? 'none' : undefined"
                @click="getNextPage(filter)"
            >
                <BaseLoadingDots v-if="applicantSearchData.isLoading"/>
                <span
                    :class="{
                        'ml-3': applicantSearchData.isLoading
                    }"
                >
                    {{ t('button','showMoreCandidates') }}
                </span>
            </BaseButton>
        </div>
    </template>
</template>
