<script setup lang="ts">
import {
    onMounted,
    shallowRef,
} from 'vue';
import { BaseFunctions } from './BaseFunctions';

const props = defineProps({
    iconName: {
        type: String,
        default: '',
        required: true,
    },
    width: {
        type: [Number, String],
        default: 24,
    },
    height: {
        type: [Number, String],
        default: 24,
    },
    primary: {
        type: Boolean,
        default: false,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['buttonClick']);

const icon = shallowRef(null);
onMounted(async () => {
    await BaseFunctions.getIcon(props.iconName).then((res) => {
        icon.value = res;
    });
});
</script>
<template>
    <button
        class="flex w-9 items-center justify-center rounded"
        :class="{
            'border-green-800 border text-green-800 hover:bg-green-800 hover:text-white': secondary,
            'bg-green-600 text-white': primary,
        }"
        @click="$emit('buttonClick')"
    >
        <svg
            viewBox="0 0 24 24"
            :aria-labelledby="iconName"
            :width="width"
            :height="height"
        >
            <Component :is="icon"/>
        </svg>
    </button>
</template>
