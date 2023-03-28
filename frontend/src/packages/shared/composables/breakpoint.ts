import {
    onUnmounted,
    getCurrentInstance,
    ref,
    type Ref,
} from 'vue';

export const BREAKPOINTS = {
    sm: '640px',
    md: '720px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1621px',
    '4xl': '1920px',
};

function useMediaQuery(query:string):Ref<boolean> {
    if (!window.matchMedia) return ref(false);

    const mediaQuery = window.matchMedia(query);
    const matches:Ref<boolean> = ref(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
        matches.value = event.matches;
    };

    mediaQuery.addEventListener('change', handler);

    if (getCurrentInstance()) {
        onUnmounted(() => {
            mediaQuery.removeEventListener('change', handler);
        });
    }

    return matches;
}

export function useBreakpoint(breakpoint:string, mode: 'min' | 'max' = 'min') {
    return useMediaQuery(`(${mode}-width: ${breakpoint})`);
}
