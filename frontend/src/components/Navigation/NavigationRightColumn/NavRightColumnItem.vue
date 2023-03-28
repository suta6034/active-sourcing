<script setup lang="ts">
import {
    DATA_GTM_ELEMENT,
    DATA_GTM_ELEMENT_DETAIL,
    TRACKINGPREFIX,
} from '../../../util/tracking/tracking';

defineProps({
    isNavExtended: {
        type: Boolean,
        default: false,
    },
    isSelected: {
        type: Boolean,
        default: false,
    },
    navItemId: {
        type: Number,
        default: null,
    },
    label: {
        required: true,
        type: String,
        default: '',
    },
});

defineEmits(['toggleNavRightColumn']);
</script>
<template>
    <div
        class="NavRightColumnNavItem flex w-full py-4 px-5"
        data-testid="NavRightColumnItem"
    >
        <div class="flex w-full items-center bg-gray-50 p-4">
            <button
                :class="`NavRightColumnNavItem-${navItemId}`"
                class="flex items-center"
                :data-testid="`NavRightColumnNavItem-${navItemId}`"
                :data-gtm-element="`${TRACKINGPREFIX}: ${DATA_GTM_ELEMENT.navigation}`"
                :data-gtm-element-detail="DATA_GTM_ELEMENT_DETAIL[label]"
                @click="$emit('toggleNavRightColumn', navItemId)"
            >
                <svg
                    :class="{'text-gray-300' : !isSelected}"
                    viewbox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <slot name="icon"/>
                </svg>
                <div
                    v-if="isNavExtended"
                    class="ml-5 text-base font-semiBold tracking-[-0.1px]"
                    :class="{'text-gray-300' : !isSelected}"
                >
                    <slot name="label"/>
                </div>
            </button>
        </div>
    </div>
</template>
