<script setup lang="ts">
defineProps({
    viewBox: {
        type: String,
        default: '0 0 24 24',
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
});

</script>
<template>
    <svg
        :class="[height, width]"
        :viewBox="viewBox"
    >
        <slot/>
    </svg>
</template>
