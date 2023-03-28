<script setup lang="ts">
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon.vue';

defineProps({
    shadow: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        default: '',
    },
});

defineEmits(['backNavigation']);

</script>
<template>
    <div
        class="BaseBackNavigation mb-1 flex h-[60px] shrink-0 items-center bg-white pl-6"
        :class="{
            'shadow-bottom z-10': shadow,
        }"
        data-testid="BaseBackNavigation"
        tabindex="0"
        @keyup.space="$emit('backNavigation')"
        @keyup.enter="$emit('backNavigation')"
    >
        <svg
            class="cursor-pointer"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            data-testid="BaseBackNavigation button"
            @click="$emit('backNavigation')"
        >
            <ArrowLeftIcon/>
        </svg>
        <span class="pl-5 text-gray-600">{{ text }}</span>
    </div>
</template>
