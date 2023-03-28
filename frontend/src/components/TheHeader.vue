<script setup lang="ts">
import { ref, watch } from 'vue';

import { useApplicant } from '../packages/shared/composables/applicant';
import { BREAKPOINTS, useBreakpoint } from '../packages/shared/composables/breakpoint';

import ApplicantSearchField from '../packages/applicant/components/SearchField/ApplicantSearchField.vue';

const props = defineProps({
    showBackdrop: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['activateBackdrop']);

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);

const {
    selectedApplicantId,
} = useApplicant();

const isExtended = ref(false);
const extendHeader = (value: boolean) => {
    isExtended.value = value;
};

watch(() => props.showBackdrop, () => {
    isExtended.value = props.showBackdrop;
});

</script>

<template>
    <nav
        v-if="isTwoXLScreen || !isTwoXLScreen && !selectedApplicantId"
        class="
        TheHeader
        flex
        p-6
        2xl:items-center
        2xl:justify-center
        "
    >
        <ApplicantSearchField
            :is-extended="isExtended"
            @extend-header="extendHeader"
            @activate-backdrop="$emit('activateBackdrop', $event)"
        />
    </nav>
</template>
