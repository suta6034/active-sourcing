<script setup lang="ts">
import {
    onMounted, ref, type Ref, watch,
} from 'vue';

import EuroIcon from '../../assets/icons/EuroIcon.vue';

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
    value: {
        type: Number,
        default: undefined,
    },
    min: {
        type: Number,
        default: undefined,
    },
    max: {
        type: Number,
        default: undefined,
    },
    unit: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    defaultValue: {
        type: Number,
        default: undefined,
    },
    error: {
        type: Boolean,
        default: null,
    },
    styling: {
        type: String,
        default: '',
    },
    testId: {
        type: String,
        default: '',
    },
    allowOnlyInteger: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['inputChange']);

const inputValue: Ref<number | undefined> = ref(props.value != null ? props.value : undefined);

watch(() => props.value, (newValue) => {
    inputValue.value = newValue;
});

function checkValid(): void {
    if (Number.isNaN(inputValue.value)) {
        inputValue.value = undefined;
    }
    if ((inputValue.value == null || `${inputValue.value}` === '') && props.required) {
        if (props.defaultValue != null) {
            inputValue.value = props.defaultValue;
        } else {
            inputValue.value = 0;
        }
    } else if (
        props.min != null && !(inputValue.value == null || `${inputValue.value}` === '') && inputValue.value < props.min
    ) {
        inputValue.value = props.min;
    }
    if (props.max && inputValue.value && inputValue.value > props.max) {
        inputValue.value = props.max;
    }
    const newValue = inputValue.value == null || `${inputValue.value}` === '' ? undefined : inputValue.value;
    emit('inputChange', newValue);
}

function isNumber(event: KeyboardEvent) {
    if (Number.isNaN(Number(event.key)) && props.allowOnlyInteger) {
        return event.preventDefault();
    }
    return event;
}

watch(() => props.value, (newValue) => {
    inputValue.value = newValue;
    checkValid();
});

onMounted(() => {
    if (props.required && props.value == null) {
        inputValue.value = props.defaultValue != null ? props.defaultValue : 0;
    }
});
</script>
<template>
    <div class="relative">
        <input
            v-model="inputValue"
            :data-testid="testId"
            class="
            w-full
            rounded-t
            border-b
            bg-gray-50
            p-4
            focus:border-b
            focus:outline-0
            disabled:cursor-not-allowed
            disabled:text-gray-500"
            :class="`
            ${cursorPointer && !isDisabled ? 'cursor-pointer' : ''}
            ${(error) ?'border-error' :
            'border-gray-300 focus-within:border-blue-900'}
            ${unit && 'pr-7'}
            ${styling}
            `"
            type="number"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :min="min ? min.toString() : ''"
            :max="max"
            @change="checkValid"
            @keypress="isNumber($event)"
        >
        <svg
            v-if="unit"
            viewBox="0 0 24 24"
            class="
            absolute
            right-0
            top-[0.9rem]
            m-auto
            mr-4
            text-base
            text-gray-700"
            width="19"
            height="19"
        ><EuroIcon/></svg>
    </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type=number] {
    -moz-appearance: textfield;
}
</style>
