<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'white',
    },
});

</script>
<template>
    <div
        :class="{
            'bg-white': type === 'white',
            'bg-info': type === 'info',
            'bg-error': type === 'error',
        }"
    >
        <slot/>
    </div>
</template>
