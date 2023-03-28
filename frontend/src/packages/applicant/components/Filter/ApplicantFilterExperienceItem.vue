<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { BREAKPOINTS, useBreakpoint } from '../../../shared/composables/breakpoint';
import { useLang } from '../../../shared/composables/i18n';

import type { FilterLabelItem, Range } from '@/packages/shared/types/applicant/types';
import DustbinIcon from '../../../shared/assets/icons/DustbinIcon.vue';
import BaseFormSingleSelect from '../../../shared/components/base/BaseFormSingleSelect.vue';
import ApplicantFilterRangeInput from './ApplicantFilterRangeInput.vue';

defineProps({
    selectedJobField: {
        type: Object as () => FilterLabelItem | undefined,
        default: undefined,
    },
    selectedJobLevel: {
        type: Object as () => Range | undefined,
        default: undefined,
    },
    jobFields: {
        type: Object as () => Array<FilterLabelItem>,
        default: null,
    },
    disabledEntries: {
        type: Object as () => Array<FilterLabelItem>,
        default: null,
    },
});

const emit = defineEmits(['delete', 'jobField', 'months', 'isValid']);

const isMDScreen = useBreakpoint(BREAKPOINTS.md);

const { t } = useLang();

const rangeIsValid: Ref<boolean> = ref(true);

function updateFilter(selection: FilterLabelItem | Range |undefined, isJobField: boolean): void {
    emit(isJobField ? 'jobField' : 'months', selection);
}

function isValid(valid: boolean): void {
    rangeIsValid.value = valid;
    emit('isValid', valid);
}

</script>
<template>
    <div class="ApplicantFilterExperienceItem flex flex-col pt-5 md:flex-row">
        <div class="SelectJobField flex pb-3 md:w-1/2 md:pb-0">
            <BaseFormSingleSelect
                :label="t('input', 'jobFieldFilter')"
                :form-label="t('label', 'jobField')"
                width="w-full"
                :selected="selectedJobField"
                :disabled-entries="disabledEntries"
                :entries="jobFields || []"
                @selection="updateFilter($event, true)"
            />
            <template v-if="!isMDScreen">
                <button
                    class="DeleteEntry group mt-[24px] ml-5 focus:outline-none md:ml-0"
                    @click="$emit('delete',$event)"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        class="cursor-pointer stroke-gray-400
                        hover:stroke-blue-900 group-focus:stroke-blue-900"
                    >
                        <DustbinIcon/>
                    </svg>
                </button>
            </template>
        </div>
        <div class="SelectJobLevel md:ml-[22px] md:w-1/2">
            <div class="flex gap-4">
                <div>
                    <ApplicantFilterRangeInput
                        group="experiences"
                        :from="!selectedJobField ? undefined : selectedJobLevel?.from || 0"
                        :to="!selectedJobField ? undefined : selectedJobLevel?.to || undefined"
                        :disabled="!selectedJobField"
                        :max="40"
                        placeholder-from="min. 0"
                        placeholder-to="max. 40+"
                        :allow-only-integer="true"
                        @update-filter="updateFilter({
                            from: $event.key === 'from' ? $event.id : selectedJobLevel?.from,
                            to: $event.key === 'to' ? $event.id : selectedJobLevel?.to,
                        }, false)"
                        @is-valid="isValid($event)"
                    />
                </div>
                <template v-if="isMDScreen">
                    <button
                        class="DeleteEntry group focus:outline-none"
                        :class="{
                            'mt-[24px]': rangeIsValid,
                            'mb-[24px]': !rangeIsValid,
                        }"
                        @click="$emit('delete',$event)"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            class=" cursor-pointer stroke-gray-400
                        hover:stroke-blue-900 group-focus:stroke-blue-900"
                        >
                            <DustbinIcon/>
                        </svg>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>
