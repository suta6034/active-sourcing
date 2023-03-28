<script setup lang="ts">
import {
    computed, onMounted, onUnmounted, ref, type Ref,
} from 'vue';

import { BREAKPOINTS, useBreakpoint } from '../../../packages/shared/composables/breakpoint';
import { userInfo } from '../../../packages/shared/composables/user-info';
import { useLang } from '../../../packages/shared/composables/i18n';

import { isNavColumnExtended } from '../../../packages/shared/navigation/Navigation';
import SearchIcon from '../../../packages/shared/assets/icons/SearchIcon.vue';
import XListIcon from '../../../packages/shared/assets/icons/XListIcon.vue';
import NavRightColumnItem from './NavRightColumnItem.vue';
import NavigationRightColumnUserInfo from './NavigationRightColumnUserInfo.vue';

const {
    t,
} = useLang();

const emit = defineEmits(['toggleNavMenu', 'activateBackdrop']);

const isFourXLScreen = ref(useBreakpoint(BREAKPOINTS['4xl']));
const untilMDScreen = ref(useBreakpoint(BREAKPOINTS.md, 'max'));
const isBetweenMDAndFourXL = computed(() => !isFourXLScreen.value && !untilMDScreen.value);

const navItems = [
    { id: 1, icon: SearchIcon, label: 'activeSourcing' },
];

const selectedNavItem: Ref<number> = ref(navItems[0].id);

const toggleNavRightColumn = (navItem = selectedNavItem.value) => {
    if (isBetweenMDAndFourXL.value) {
        emit('activateBackdrop', !isNavColumnExtended.value);
        isNavColumnExtended.value = !isNavColumnExtended.value;
    }
    selectedNavItem.value = navItem;
};

const checkScreenSize = () => {
    isFourXLScreen.value = useBreakpoint(BREAKPOINTS['4xl']).value;
    untilMDScreen.value = useBreakpoint(BREAKPOINTS.md, 'max').value;
};

const getInitialNavState = () => {
    // Resize: get proper screen size state
    checkScreenSize();

    // Resize: Reset backdrop state
    emit('activateBackdrop', false);

    // Resize: Reset nav column state
    isNavColumnExtended.value = !isBetweenMDAndFourXL.value;
};

onMounted(() => {
    window.addEventListener('resize', getInitialNavState);
});
onUnmounted(() => {
    window.removeEventListener('resize', getInitialNavState);
});

</script>
<template>
    <div
        class="NavRightColumn absolute left-[80px] flex h-[100vh] flex-col bg-white shadow"
        :class="{
            'w-[80px]': !isNavColumnExtended,
            'w-[272px]': isFourXLScreen || isNavColumnExtended,
            'relative !left-0': isFourXLScreen
        }"
        data-testid="NavRightColumn"
    >
        <button
            v-if="!isFourXLScreen && isNavColumnExtended"
            class="NavXButton absolute top-3 right-3"
            data-testid="NavXButton"
            @click="untilMDScreen ? $emit('toggleNavMenu') : toggleNavRightColumn()"
        >
            <svg
                class="text-gray-400"
                viewBox="-3 -3 24 24"
                width="24"
                height="24"
            >
                <XListIcon/>
            </svg>
        </button>
        <div
            class="absolute top-[169px] flex w-full flex-col items-center"
        >
            <NavRightColumnItem
                v-for="navItem in navItems"
                :key="navItem.id"
                :is-nav-extended="isNavColumnExtended"
                :is-selected="selectedNavItem === navItem.id"
                :nav-item-id="navItem.id"
                :label="navItem.label"
                @toggle-nav-right-column="toggleNavRightColumn"
            >
                <template #icon>
                    <Component
                        :is="navItem.icon"
                    />
                </template>
                <template #label>
                    {{ t('label', navItem.label) }}
                </template>
            </NavRightColumnItem>
        </div>
        <div
            v-if="isNavColumnExtended || isFourXLScreen"
            class="absolute bottom-5 w-[272px]"
        >
            <NavigationRightColumnUserInfo
                :first-name="userInfo?.firstName || undefined"
                :last-name="userInfo?.lastName || undefined"
                :initials="userInfo?.initials || undefined"
                :img="userInfo?.profilePictureUrl || undefined"
                :company-name="userInfo?.company?.name || undefined"
                :company-address="userInfo?.company?.address || undefined"
            />
        </div>
    </div>
</template>
