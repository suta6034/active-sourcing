<script setup lang="ts">
import {
    useBreakpoint,
    BREAKPOINTS,
} from '../../../../../shared/composables/breakpoint';
import { useApplicant } from '../../../../../shared/composables/applicant';

import ApplicantSearchResultItemContent from './ApplicantSearchResultItemContent.vue';
import BaseAvatar from '../../../../../shared/components/base/BaseAvatar.vue';
import ThumbsDownIcon from '../../../../../shared/assets/icons/ThumbsDownIcon.vue';
import StarIcon from '../../../../../shared/assets/icons/StarIcon.vue';

import type { PreferredWorkplaces } from '../../../../../shared/types/applicant/types';

const {
    selectedApplicantId,
} = useApplicant();

defineProps({
    id: {
        type: String,
        default: '',
    },
    currentJobTitle: {
        type: String,
        default: '',
    },
    workExperience: {
        type: Number,
        default: 0,
    },
    jobField: {
        type: String,
        default: '',
    },
    location: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
    readyToMove: {
        type: Boolean,
        default: false,
    },
    objectiveJob: {
        type: String,
        default: '',
    },
    isPending: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['onSelectListItem']);

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);

</script>

<template>
    <div
        class="
            ApplicantSearchResultItem
            flex
            cursor-pointer
            rounded-sm
            bg-white
            p-5
            2xl:py-6
            "
        :class="{
            'border-l-4 border-blue-900 2xl:pl-[20px]': selectedApplicantId === id,
            '2xl:pl-6': selectedApplicantId !== id,
        }"
        tabindex="0"
        :data-testid="'ApplicantSearchResultItem ' + id"
        @click="emit('onSelectListItem', { id: id, preferredWorkplaces: location })"
    >
        <div class="avatar w-7 shrink-0 2xl:w-[53px]">
            <BaseAvatar
                :is-pending="isPending"
                :width="isTwoXLScreen ? 53 : 32"
                :height="isTwoXLScreen ? 53 : 32"
            />
        </div>
        <div class="content ml-3 w-[256px] grow 2xl:ml-5 2xl:w-[314px]">
            <ApplicantSearchResultItemContent
                :id="id"
                :current-job-title="currentJobTitle"
                :work-experience="workExperience"
                :job-field="jobField"
                :location="location ? location[0].label?.toString() : ''"
                :ready-to-move="readyToMove"
                :objective-job="objectiveJob"
            />
        </div>
        <div
            class="shrink-0 pl-5 2xl:pl-6"
        >
            <svg
                viewBox="0 0 24 24"
                class="mb-5 cursor-pointer"
                width="24"
                height="24"
            >
                <StarIcon/>
            </svg>
            <svg
                viewBox="0 0 24 24"
                class="cursor-pointer"
                width="24"
                height="24"
            >
                <ThumbsDownIcon/>
            </svg>
        </div>
    </div>
</template>
