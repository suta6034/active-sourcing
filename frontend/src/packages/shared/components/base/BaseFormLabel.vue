<script setup lang="ts">
defineProps({
    text: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <div
        v-if="text"
        class="BaseFormLabel mb-2 text-small font-normal"
        :class="{
            'text-gray-600': disabled,
        }"
    >
        {{ text }}
    </div>
</template>
