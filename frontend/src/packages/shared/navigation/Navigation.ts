import { computed, ref } from 'vue';
import { BREAKPOINTS, useBreakpoint } from '../composables/breakpoint';

export const MOBILE_NAVBAR_WIDTH = 0;
export const LEFT_NAVBAR_WIDTH = 80;
export const RIGHT_NAVBAR_COLLAPSED_WIDTH = 80;
export const RIGHT_NAVBAR_EXPANDED_WIDTH = 272;

const isFourXLScreen = ref(useBreakpoint(BREAKPOINTS['4xl']));
const untilMDScreen = ref(useBreakpoint(BREAKPOINTS.md, 'max'));
const isBetweenMDAndFourXL = computed(() => !isFourXLScreen.value && !untilMDScreen.value);

export const isNavColumnExtended = ref(!isBetweenMDAndFourXL.value);
