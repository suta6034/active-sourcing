<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';
import BaseModal from '../../../shared/components/base/BaseModal.vue';
import { BREAKPOINTS, useBreakpoint } from '../../../shared/composables/breakpoint';
import ApplicantFilterModal from '../Filter/modal/ApplicantFilterModal.vue';
import { allFiltersLabels } from '../../repositories/filter-repository';

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['close', 'showChange']);

const untilMDScreen = ref(useBreakpoint(BREAKPOINTS.md, 'max'));

const show: Ref<boolean> = ref(false);
watchEffect(() => {
    show.value = props.showModal;
});

</script>
<template>
    <BaseModal
        v-slot="slotProps"
        :show="showModal"
        :full-height="untilMDScreen"
        @close="show = false; $emit('showChange', show)"
    >
        <ApplicantFilterModal
            :all-filters-labels="allFiltersLabels"
            @close-modal="slotProps.closeModal();$emit('close')"
        />
    </BaseModal>
</template>
