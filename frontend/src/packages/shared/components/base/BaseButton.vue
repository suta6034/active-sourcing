<script setup lang="ts">
import {
    onMounted,
    shallowRef,
} from 'vue';
import { BaseFunctions } from './BaseFunctions';

const props = defineProps({
    paddingX: {
        type: String,
        default: 'l',
    },
    size: {
        type: String,
        default: 'm',
    },
    primary: {
        type: Boolean,
        default: false,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
    navigation: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: '',
    },
    iconWidth: {
        type: Number,
        default: 24,
    },
    iconHeight: {
        type: Number,
        default: 24,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const icon = shallowRef(null);
onMounted(async () => {
    if (props.iconName) {
        await BaseFunctions.getIcon(props.iconName).then((res) => {
            icon.value = res;
        });
    }
});
</script>
<template>
    <button
        v-bind="$attrs"
        class="BaseButton rounded text-center"
        :class="{
            'w-auto': size === 'auto',
            'w-full': size === 'full',
            'w-[8.5rem]': size === 'm',
            'w-[13rem]': size === 'l',
            'w-[480px]': size === 'xl',
            'h-[36px] py-[9px] flex items-center px-4': size === 's',
            'h-9': size !== 's',
            'px-7': paddingX === 'l' && size !== 's',
            'border-green-800 border text-green-800 hover:bg-green-800 hover:text-white hover:border-green-800'
                :secondary,
            'bg-green-600 text-white hover:bg-green-800'
                :primary,
            'border-blue-900 border text-blue-900 hover:bg-blue-900 hover:text-white': navigation,
            'Disabled bg-gray-400 text-white hover:cursor-not-allowed': disabled,
        }"
    >
        <span class="text-regular flex h-6 items-center justify-center text-center text-base">
            <slot/>
            <svg
                v-if="icon"
                class="ml-3 h-full"
                viewBox="0 0 24 24"
                :width="iconWidth"
                :height="iconHeight"
            >
                <Component :is="icon"/>
            </svg>
        </span>
    </button>
</template>
