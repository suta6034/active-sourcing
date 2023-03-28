<script setup lang="ts">
import {
    ref, onMounted, onUnmounted,
} from 'vue';

import {
    useBreakpoint,
    BREAKPOINTS,
} from '../../packages/shared/composables/breakpoint';
import { useApplicant } from '../../packages/shared/composables/applicant';

import TheHeader from '../TheHeader.vue';
import NavigationDrawer from '../Navigation/NavigationDrawer.vue';
import BaseBackdrop from '../../packages/shared/components/base/BaseBackdrop.vue';
import BurgerIcon from '../../packages/shared/assets/icons/BurgerIcon.vue';
import { useFilter } from '../../packages/shared/composables/filter';

const {
    standAloneApplicantId,
    selectedApplicantId,
    search: triggerSearch,
} = useApplicant();

const { filter } = useFilter();

const isMDScreen = useBreakpoint(BREAKPOINTS.md);

const showSearchBackdrop = ref(false);
const showNavBackdrop = ref(false);
const showNavMenu = ref(false);

const activateSearchBackdrop = (value: boolean) => {
    showSearchBackdrop.value = value;
};
const activateNavBackdrop = (value: boolean) => {
    showNavBackdrop.value = value;
    showNavMenu.value = value;
};

const toggleNavMenu = () => {
    showNavMenu.value = !showNavMenu.value;
    showNavBackdrop.value = !showNavBackdrop.value;
};

const closeMobileMenu = () => {
    showNavMenu.value = false;
    showNavBackdrop.value = false;
};

onMounted(async () => {
    if (!standAloneApplicantId.value) {
        await triggerSearch(filter.value);
    }

    window.addEventListener('resize', closeMobileMenu);
});
onUnmounted(() => {
    window.removeEventListener('resize', closeMobileMenu);
});
</script>

<template>
    <div class="LayoutDefault flex h-[100vh]">
        <NavigationDrawer
            v-if="isMDScreen"
            :show-backdrop="showNavBackdrop"
            @activate-backdrop="activateNavBackdrop"
        />
        <div
            class="flex h-full w-full grow flex-col overflow-auto"
        >
            <BaseBackdrop
                class="NavBackdrop"
                :show-backdrop="showNavBackdrop"
                @activate-backdrop="activateNavBackdrop"
            />
            <div
                v-if="!isMDScreen && !selectedApplicantId"
                class="LayoutDefaultMobileNav relative flex h-[60px] items-center border border-gray-200 p-[18px]"
            >
                <button
                    class="NavBurgerIcon"
                    data-testid="NavBurgerIcon"
                    @click="toggleNavMenu"
                >
                    <svg
                        viewbox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <BurgerIcon/>
                    </svg>
                </button>
                <NavigationDrawer
                    v-if="showNavMenu && !isMDScreen"
                    class="absolute left-0 top-0 h-[100vh]"
                    @toggle-nav-menu="toggleNavMenu"
                />
            </div>
            <TheHeader
                :show-backdrop="showSearchBackdrop"
                @activate-backdrop="activateSearchBackdrop"
            />
            <div class="LayoutDefaultContent relative h-full overflow-hidden">
                <BaseBackdrop
                    class="SearchBackdrop"
                    :show-backdrop="showSearchBackdrop"
                    is-partial
                    @activate-backdrop="activateSearchBackdrop"
                />
                <slot/>
            </div>
        </div>
    </div>
</template>
