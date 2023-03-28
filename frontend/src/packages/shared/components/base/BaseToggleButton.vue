<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps({
    state: {
        type: Boolean,
        default: false,
    },
    labelText: {
        type: String,
        default: '',
    },
});

const emit = defineEmits<{(e: 'toggle', arg1: boolean): void }>();

const isToggled = ref(false);
watchEffect(() => {
    isToggled.value = props.state;
});

const onToggle = (evt: Event) => {
    isToggled.value = !isToggled.value;
    emit('toggle', isToggled.value);
    evt.preventDefault();
};

</script>
<template>
    <label class="block max-w-max">
        <input
            :checked="isToggled"
            data-testid="BaseToggleButton input"
            class="hidden h-0 w-0"
            type="checkbox"
            @click="onToggle"
        >
        <span
            tabindex="0"
            data-testid="BaseToggleButton toggle"
            class="
                symbol
                relative
                inline-block
                h-[1.25rem]
                w-8
                cursor-pointer
                rounded-3xl
                before:absolute
                before:bottom-1
                before:left-1
                before:h-5
                before:w-5
                before:rounded-full
                before:bg-white
                before:transition
                before:duration-300"
            :class="{
                'bg-blue-900 isChecked': isToggled,
                'before:translate-x-[1.25rem]': isToggled,
                'bg-gray-400': !isToggled,
                'mr-2': labelText && labelText.length
            }"
            @keyup.space="onToggle"
        />
        <span
            v-if="labelText && labelText.length"
            class="inline-block -translate-y-2 text-gray-600"
        >{{ labelText }}</span>
    </label>
</template>
