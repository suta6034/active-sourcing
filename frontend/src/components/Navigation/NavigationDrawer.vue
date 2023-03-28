<script setup lang="ts">
import {
    computed, onMounted,
    ref, watch,
} from 'vue';

import { getUserInfo, userInfo } from '../../packages/shared/composables/user-info';
import { BREAKPOINTS, useBreakpoint } from '../../packages/shared/composables/breakpoint';
import { USERPROPERTIES, tracking } from '../../util/tracking/tracking';

import { isNavColumnExtended } from '../../packages/shared/navigation/Navigation';
import NavigationLeftColumn from './NavigationLeftColumn/NavigationLeftColumn.vue';
import NavigationRightColumn from './NavigationRightColumn/NavigationRightColumn.vue';

const props = defineProps({
    showBackdrop: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['toggleNavMenu', 'activateBackdrop']);

const isFourXLScreen = ref(useBreakpoint(BREAKPOINTS['4xl']));
const untilMDScreen = ref(useBreakpoint(BREAKPOINTS.md, 'max'));
const isBetweenMDAndFourXL = computed(() => !isFourXLScreen.value && !untilMDScreen.value);

const toggleNavMenu = () => {
    if (isBetweenMDAndFourXL.value) {
        emit('activateBackdrop', !isNavColumnExtended.value);
        isNavColumnExtended.value = !isNavColumnExtended.value;
    }
};

watch(() => props.showBackdrop, () => {
    // Close backdrop, so collapse nav column
    if (!props.showBackdrop) isNavColumnExtended.value = false;
});

onMounted(async () => {
    userInfo.value = await getUserInfo();
});

/* c8 ignore next 5 */
watch(() => userInfo.value, () => {
    tracking({
        [USERPROPERTIES.customer_type]: userInfo.value?.customerType || null,
    });
});
</script>
<template>
    <div
        class="NavigationDrawer z-30 mr-[80px] flex bg-blue-900"
        :class="{'!mr-0': isFourXLScreen}"
        data-testid="NavigationDrawer"
    >
        <NavigationLeftColumn @toggle-nav-menu="toggleNavMenu"/>
        <NavigationRightColumn
            @activate-backdrop="$emit('activateBackdrop', $event)"
            @toggle-nav-menu="$emit('toggleNavMenu')"
        />
    </div>
</template>
