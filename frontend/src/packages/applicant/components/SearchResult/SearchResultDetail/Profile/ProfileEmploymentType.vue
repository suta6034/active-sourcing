<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';
import { useFilter } from '../../../../../shared/composables/filter';

import BaseTextWithIcon from '../../../../../shared/components/base/BaseTextWithIcon.vue';

const props = defineProps({
    employmentTypeIds: {
        type: Object as () => Array<number>,
        default: null,
    },
});

const { getLabelForFilter } = useFilter();
const employmentTypeString: Ref<string> = ref('');

function buildEmploymentTypeString(): string {
    const filterLables: Array<string> = [];
    if (props.employmentTypeIds) {
        props.employmentTypeIds.forEach((id) => {
            filterLables.push(getLabelForFilter('employmentTypes', id));
        });
    }
    return filterLables.join(', ');
}

watchEffect(() => {
    employmentTypeString.value = buildEmploymentTypeString();
});
</script>
<template>
    <BaseTextWithIcon
        v-if="employmentTypeString"
        class="EmploymentType text-gray-600"
        icon-name="Time"
        data-testid="ProfileEmploymentType"
        :element="employmentTypeString"
    />
</template>
