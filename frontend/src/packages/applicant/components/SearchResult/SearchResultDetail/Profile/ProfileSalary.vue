<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';

import { useLang } from '../../../../../shared/composables/i18n';

import BaseTextWithIcon from '../../../../../shared/components/base/BaseTextWithIcon.vue';

const props = defineProps({
    salary: {
        type: Number,
        default: null,
    },
    showLabel: {
        type: Boolean,
        default: false,
    },
});

const { t } = useLang();

const label: Ref<string> = ref('');

watchEffect(() => {
    label.value = props.showLabel ? `${t('label', 'objectiveSalary')}: ` : '';
});

// example: 3450 -> € 3.450
function formatSalary(value: number): string {
    return `€ ${value.toLocaleString('de-DE')}`;
}

</script>
<template>
    <BaseTextWithIcon
        class="ObjectiveSalary text-gray-600"
        icon-name="Wallet"
        data-testid="ProfileSalary"
        :element="label + (salary != null ? formatSalary(salary) : t('input', 'notSpecified'))"
    />
</template>
