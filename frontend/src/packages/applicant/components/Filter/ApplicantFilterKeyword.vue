<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';
import {
    useBreakpoint,
    BREAKPOINTS,
} from '../../../shared/composables/breakpoint';

import BaseFormMultiSelect from '../../../shared/components/base/BaseFormMultiSelect.vue';
import BaseFormLabel from '../../../shared/components/base/BaseFormLabel.vue';

import type {
    FilterLabel,
} from '../../../shared/types/applicant/types';

defineProps({
    offsetLeft: {
        type: Number,
        default: 0,
    },
    offsetTop: {
        type: Number,
        default: 0,
    },
    labels: {
        type: Object as () => FilterLabel,
        default: null,
    },
    entries: {
        type: Object as () => Array<string> | Array<number>,
        default: undefined,
    },
    group: {
        type: String,
        default: '',
    },
});
defineEmits(['updateFilter']);

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);

const { t } = useLang();

</script>
<template>
    <div class="flex flex-col">
        <BaseFormLabel :text="t('label', 'searchResume')"/>
        <div
            class="h-9"
            :class="{
                'w-full': !isTwoXLScreen,
                'w-[17rem]': isTwoXLScreen
            }"
        >
            <BaseFormMultiSelect
                :offset-left="offsetLeft"
                :offset-top="offsetTop"
                :entries="entries"
                :labels="labels"
                :placeholder-label="t('input', 'keywordFilter')"
                :group="group"
                @update-filter="$emit('updateFilter',$event)"
            />
        </div>
    </div>
</template>
