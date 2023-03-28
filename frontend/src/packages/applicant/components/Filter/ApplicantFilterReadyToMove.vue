<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';

import BaseToggleButton from '../../../shared/components/base/BaseToggleButton.vue';

import { useFilter } from '../../../shared/composables/filter';

const {
    t,
} = useLang();

const {
    filter: filterOptions,
} = useFilter();

async function toggleReadyToMove(readyToMove: boolean): Promise<void> {
    filterOptions.value.location.readyToMove = readyToMove;
}
</script>
<template>
    <BaseToggleButton
        :state="filterOptions.location.readyToMove || undefined"
        :label-text="t('label','readyToMoveUC')"
        @toggle="toggleReadyToMove"
    />
</template>
