<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';

import { ProfileHelpers } from './ProfileHelpers';
import { BREAKPOINTS, useBreakpoint } from '../../../../../../shared/composables/breakpoint';

import ProfileContentMobileHeader from './ProfileContentMobileHeader.vue';
import ProfileContentEntryContainer from './ProfileContentEntryContainer.vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    contentEntryId: {
        type: Number,
        default: -1,
    },
    showAsDropdown: {
        type: Boolean,
        default: false,
    },
});

const showDropdown: Ref<boolean> = ref(false);
const isLgScreen = useBreakpoint(BREAKPOINTS.lg);

const mobileHeaderOnClick = (): void => {
    if (props.showAsDropdown) {
        showDropdown.value = !showDropdown.value;
    } else {
        ProfileHelpers.shownContentEntry.value = props.contentEntryId;
    }
};

watch(() => isLgScreen.value, (newIsLgScreen) => {
    if (newIsLgScreen) {
        ProfileHelpers.shownContentEntry.value = null;
    }
});

</script>
<template>
    <ProfileContentMobileHeader
        v-if="!isLgScreen || showAsDropdown"
        :title="title"
        :show-as-dropdown="showAsDropdown"
        :is-open="showAsDropdown && showDropdown"
        :class="{
            'pt-5': showAsDropdown,
            'pt-6': !showAsDropdown,
        }"
        @click="mobileHeaderOnClick"
    />
    <div
        v-if="(showAsDropdown && showDropdown)
            || (!showAsDropdown && (isLgScreen || ProfileHelpers.shownContentEntry.value === contentEntryId))"
        :class="{
            'px-6 py-[18px]': showAsDropdown,
        }"
    >
        <ProfileContentEntryContainer
            :show-in-modal="!isLgScreen && !showAsDropdown"
            :title="title"
            @close="() => ProfileHelpers.shownContentEntry.value = null"
        >
            <div
                v-if="isLgScreen && !showAsDropdown"
                class="pb-5 text-lead font-semiBold"
            >
                {{ title }}
            </div>
            <slot/>
        </ProfileContentEntryContainer>
    </div>
</template>
