<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';

import { useLang } from '../../../shared/composables/i18n';
import { BREAKPOINTS, useBreakpoint } from '../../../shared/composables/breakpoint';

import BaseHeadLine from '../../../shared/components/base/BaseHeadLine.vue';
import ApplicantSearchFieldLanguageSwitch from './ApplicantSearchFieldLanguageSwitch.vue';

const props = defineProps({
    isExtended: {
        type: Boolean,
        default: false,
    },
});

const extended: Ref<boolean> = ref(false);

watchEffect(() => {
    extended.value = props.isExtended;
});

const {
    t,
} = useLang();

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);
</script>

<template>
    <Transition
        mode="out-in"
        class="duration-300 ease-out"
        enter-from-class="-translate-y-[100px] opacity-0"
        leave-to-class="-translate-y-[100px] opacity-0"
    >
        <div
            v-if="extended"
            class="relative pb-5 2xl:pb-7"
            :class="{
                'flex': !isTwoXLScreen,
            }"
        >
            <BaseHeadLine
                :text="t('label','searchbarHeader')"
            />
            <div
                class="absolute right-0 top-[-8px] 2xl:right-0 2xl:top-3"
            >
                <ApplicantSearchFieldLanguageSwitch/>
            </div>
        </div>
    </Transition>
</template>
