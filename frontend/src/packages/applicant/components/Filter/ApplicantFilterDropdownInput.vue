<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';

import BaseFormMultiSelect from '../../../shared/components/base/BaseFormMultiSelect.vue';

import type {
    FilterLabel,
    FilterModalLabelNames,
    SearchTotalOptions,
} from '../../../shared/types/applicant/types';

const { t } = useLang();

defineProps({
    labels: {
        type: Object as () => FilterLabel,
        default: Object,
    },
    filter: {
        type: Object as () => SearchTotalOptions,
        default: null,
    },
    group: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
});

defineEmits(['updateFilter']);
</script>
<template>
    <BaseFormMultiSelect
        :entries="filter[group as keyof FilterModalLabelNames]"
        :labels="labels"
        :form-label="t('label',label)"
        :placeholder-label="t('input', label+'Filter')"
        :group="group"
        @update-filter="$emit('updateFilter',$event)"
    />
</template>
