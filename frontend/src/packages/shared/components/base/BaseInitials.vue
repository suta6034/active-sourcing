<script setup lang="ts">
import { ref, type Ref } from 'vue';

defineProps({
    initials: {
        type: String,
        default: '',
    },
    img: {
        type: String,
        default: '',
    },
    small: {
        type: Boolean,
        default: false,
    },
    clickable: {
        type: Boolean,
        default: false,
    },
});

const imgLoadError: Ref<boolean> = ref(false);

defineEmits(['initialsClick']);

</script>
<template>
    <div
        class="BaseInitials flex items-center justify-center rounded-[3px] bg-gray-300"
        :class="{
            'h-11 w-11 text-base font-semiBold': !small,
            'h-9 w-9 text-small': small,
            'cursor-pointer': clickable,
        }"
        :data-testid="'BaseInitials' + (small ? ' Small' : '')"
        @click="clickable ? $emit('initialsClick') : ''"
    >
        <img
            v-if="img && !imgLoadError"
            data-testid="BaseInitials image"
            alt="img"
            :src="img"
            @error="imgLoadError = true"
        >
        <span
            v-else
            class="tracking-[-0.1px]"
            data-testid="BaseInitials initials"
        >
            {{ initials }}
        </span>
    </div>
</template>
