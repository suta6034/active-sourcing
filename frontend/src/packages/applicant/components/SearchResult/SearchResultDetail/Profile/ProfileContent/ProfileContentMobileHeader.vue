<script setup lang="ts">
import ArrowUpIcon from '../../../../../../shared/assets/icons/ArrowUpIcon.vue';

defineProps({
    title: {
        type: String,
        default: '',
    },
    showAsDropdown: {
        type: Boolean,
        default: false,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['click']);
</script>
<template>
    <div
        class="ProfileContentMobileHeader px-6"
        data-testid="ProfileContentMobileHeader"
        tabindex="0"
        @keyup.enter="$emit('click')"
        @keyup.space="$emit('click')"
        @click="$emit('click')"
    >
        <div
            class="flex cursor-pointer justify-between"
            :class="{
                'pb-5 border-b border-gray-100': showAsDropdown && !isOpen,
            }"
        >
            <span class="Title font-semiBold">
                {{ title }}
            </span>
            <svg
                class="ArrowIcon mt-2 inline"
                :class="{
                    'rotate-90': !showAsDropdown,
                    'rotate-180': showAsDropdown && isOpen,
                }"
                width="16px"
                height="16px"
            >
                <ArrowUpIcon/>
            </svg>
        </div>
    </div>
</template>
