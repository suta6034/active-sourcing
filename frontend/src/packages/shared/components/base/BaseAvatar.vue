<script setup lang="ts">
import AvatarLockedIcon from '../../assets/icons/AvatarLockedIcon.vue';
import AvatarPending from '../../assets/icons/AvatarPending.vue';

defineProps({
    isPending: {
        type: Boolean,
        default: false,
    },
    width: {
        type: Number,
        default: 53,
    },
    height: {
        type: Number,
        default: 53,
    },
});
</script>
<template>
    <svg
        v-if="isPending"
        data-testid="profile pending avatar"
        :width="width"
        :height="height"
    ><AvatarPending/></svg>
    <svg
        v-else
        viewBox="0 0 40 40"
        data-testid="profile locked avatar"
        :width="width"
        :height="height"
    ><AvatarLockedIcon/></svg>
</template>
