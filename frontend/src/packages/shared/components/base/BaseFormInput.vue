<script setup inherit-attrs="false" lang="ts">
import {
    nextTick, onMounted,
    ref,
    type Ref,
} from 'vue';
import BaseErrorMessage from './BaseErrorMessage.vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: '',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    cursorPointer: {
        type: Boolean,
        default: false,
    },
    group: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String as () => string | null,
        default: null,
    },
    error: {
        type: Object,
        default: null,
    },
    isFocused: {
        type: Boolean,
        default: false,
    },
    isReadonly: {
        type: Boolean,
        default: false,
    },
});

const inputElement: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
    if (props.isFocused) {
        nextTick(() => {
            if (inputElement.value) {
                inputElement.value.focus();
            }
        });
    }
});

defineEmits(['update:modelValue']);
</script>
<template>
    <input
        ref="inputElement"
        v-bind="$attrs"
        :data-testid="`${group} input`"
        class="h-full w-full text-ellipsis rounded border px-4 text-base focus:outline-none"
        :class="{
            'cursor-pointer': cursorPointer,
            'border-error': error !== null && error?.$errors.length !== 0,
            'border-gray-300 focus-within:border-blue-900': !(error !== null && error?.$errors.length !== 0),
        }"
        type="text"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <div v-if="error?.$errors.length !== 0">
        <BaseErrorMessage :message="error?.$errors[0]?.$message"/>
    </div>
</template>
