<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';

import BaseFormMultiSelect from '../../../shared/components/base/BaseFormMultiSelect.vue';
import BaseFormLabel from '../../../shared/components/base/BaseFormLabel.vue';

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
    label: {
        type: String,
        default: '',
    },
    filter: {
        type: Object as () => SearchTotalOptions,
        default: null,
    },
    group: {
        type: String,
        default: '',
    },
});

defineEmits(['updateFilter']);

</script>

<template>
    <div>
        <BaseFormLabel :text="t('label', label)"/>
        <BaseFormMultiSelect
            :entries="filter[group as keyof FilterModalLabelNames]"
            :labels="labels"
            :placeholder-label="t('input', 'employmentFilter')"
            :group="group"
            @update-filter="$emit('updateFilter',$event)"
        />
    </div>
</template>
