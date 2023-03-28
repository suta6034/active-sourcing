<script setup lang="ts">
import type { Ref } from 'vue';

defineProps({
    message: {
        type: String as ()=> string | Ref<string>,
        default: '',
    },
});
</script>
<template>
    <span class="text-small text-error">{{ message }}</span>
</template>
