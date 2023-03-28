<script setup lang="ts">
import {
    useBreakpoint,
    BREAKPOINTS,
} from '../../../shared/composables/breakpoint';
import { useLang } from '../../../shared/composables/i18n';

import type { FilterLabelItem } from '@/packages/shared/types/applicant/types';
import DustbinIcon from '../../../shared/assets/icons/DustbinIcon.vue';
import BaseFormSingleSelect from '../../../shared/components/base/BaseFormSingleSelect.vue';

defineProps({
    selectedLang: {
        type: Object as () => FilterLabelItem | undefined,
        default: undefined,
    },
    selectedLevel: {
        type: Object as () => FilterLabelItem | undefined,
        default: undefined,
    },
    languages: {
        type: Object as () => Array<FilterLabelItem>,
        default: null,
    },
    levels: {
        type: Object as () => Array<FilterLabelItem>,
        default: null,
    },
    defaultLevel: {
        type: Object as () => FilterLabelItem,
        default: null,
    },
    disabledEntries: {
        type: Object as () => Array<FilterLabelItem>,
        default: null,
    },
});

const emit = defineEmits(['delete', 'language', 'level']);

const isMDScreen = useBreakpoint(BREAKPOINTS.md);

const { t } = useLang();

function updateFilter(selection: FilterLabelItem | undefined, isLang: boolean): void {
    emit(isLang ? 'language' : 'level', selection);
}
</script>
<template>
    <div class="ApplicantFilterLanguageItem flex flex-col pt-5 md:flex-row">
        <div class="SelectLanguage flex pb-3 md:mr-[22px] md:w-1/2 md:pb-0">
            <BaseFormSingleSelect
                :label="t('input', 'languageFilter')"
                :form-label="t('label', 'language')"
                width="w-full"
                :entries="languages || []"
                :selected="selectedLang"
                :disabled-entries="disabledEntries"
                @selection="updateFilter($event, true)"
            />

            <template v-if="!isMDScreen">
                <button
                    class="DeleteEntry group mt-[24px] ml-5 focus:outline-none"
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
        <div class="SelectLevel md:ml-[22px] md:w-1/2">
            <div class="flex">
                <BaseFormSingleSelect
                    :form-label="t('label', 'level')"
                    width="w-full"
                    :entries="levels"
                    :disabled="!selectedLang"
                    :selected="selectedLevel ? selectedLevel : defaultLevel"
                    :default-chosen-entry-id="defaultLevel?.id"
                    @selection="updateFilter($event, false)"
                />

                <template v-if="isMDScreen">
                    <button
                        class="DeleteEntry group mt-[24px] ml-5 focus:outline-none"
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
