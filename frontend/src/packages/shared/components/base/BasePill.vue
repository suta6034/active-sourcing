<script setup lang="ts">import { onMounted, ref, type Ref } from 'vue';

const props = defineProps({
    selectedLabel: {
        type: [String, Number],
        default: null,
    },
    hasMarginRight: {
        type: Boolean,
        default: false,
    },
    hasMarginBottom: {
        type: Boolean,
        default: false,
    },
    showDots: {
        type: Boolean,
        default: false,
    },
    filledDots: {
        type: Number,
        default: 0,
    },
    grayBackground: {
        type: Boolean,
        default: false,
    },
});

const numberOfFilledDots: Ref<number> = ref(0);

onMounted(() => {
    numberOfFilledDots.value = props.filledDots <= 3 ? props.filledDots : 3;
});

</script>
<template>
    <button
        class="max-w-[100%] truncate rounded-full
                  border border-gray-300 px-4 text-center text-base text-gray-600"
        :class="{
            'mr-[5px]': hasMarginRight,
            'mb-[11px]': hasMarginBottom,
            'bg-white': !grayBackground,
            'bg-gray-50': grayBackground,
            'cursor-auto': grayBackground,
        }"
        :title="'' + selectedLabel"
    >
        <template v-if="showDots">
            <span
                v-for="index of numberOfFilledDots"
                :key="index"
                class="mr-[2px] inline-block h-[10px] w-[10px] rounded-full bg-gray-700"
            />
            <span
                v-for="index of (3 - numberOfFilledDots)"
                :key="index"
                class="mr-[2px] inline-block h-[10px] w-[10px] rounded-full border border-gray-700"
            />
        </template>
        {{ selectedLabel }}
    </button>
</template>
