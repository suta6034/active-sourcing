<script setup inherit-attrs="false" lang="ts">
import { type Ref, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import BaseFixedContainer from './BaseFixedContainer.vue';
import BaseFormInput from './BaseFormInput.vue';
import { AUTOCOMPLETION_TYPES, getAutocompletion } from '../../composables/autocompletion';

type matchedObject = {
    matched?: string;
    unmatched?: string;
};

const props = defineProps({
    autocompletion: {
        type: String as () => AUTOCOMPLETION_TYPES,
        default: '',
    },
    inputCursorPointer: {
        type: Boolean,
        default: false,
    },
    inputErrorMessage: {
        type: Object,
        default: null,
    },
    inputGroup: {
        type: String,
        default: '',
    },
    inputPlaceholder: {
        type: String,
        default: '',
    },
    isInputDisabled: {
        type: Boolean,
        default: false,
    },
    isInputFocused: {
        type: Boolean,
        default: false,
    },
    isInputReadonly: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: String as () => string | null,
        default: null,
    },
});
const emit = defineEmits(['update:modelValue']);
const inputElement: Ref<null | HTMLInputElement> = ref(null);
const autocompletionElements: Ref<Array<string>> = ref([]);
const autocompletionList: Ref<null | HTMLElement> = ref(null);
let autocompleteTimeout: number | null = null;

function clearAutocompletionElements() {
    autocompletionElements.value = [];
}

function onKeyPress(value: string) {
    if (props.autocompletion) {
        if (autocompleteTimeout != null) {
            clearTimeout(autocompleteTimeout);
        }
        autocompleteTimeout = window.setTimeout(async () => {
            autocompletionElements.value = await getAutocompletion(props.autocompletion, value);
        }, 0);
    }
    emit('update:modelValue', value);
}

function onAutocompletionElementSelect(value: string) {
    const exactValue = `"${value}"`;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    inputElement.value!.value = exactValue;
    clearAutocompletionElements();

    emit('update:modelValue', exactValue);
}

const matchString = (entry: string, input: string): matchedObject => {
    const result: matchedObject = { matched: '', unmatched: '' };
    if (input && !input.includes('"')) {
        result.matched = entry.toLowerCase().match(input.toLowerCase())?.[0];
    }
    result.unmatched = result.matched ? entry.slice(result.matched.length) : entry;
    return result;
};

const setFocusToElem = (listElements: Array<HTMLLIElement>, idx: number): void => {
    if (idx < listElements.length && idx >= 0) {
        listElements[idx]?.setAttribute('tabindex', '0');
        listElements[idx].focus();
    }
};

const listKeyHandler = (event: KeyboardEvent, value: string, currIdx: number): void => {
    if (autocompletionList.value) {
        if ((event.key === ' ' || event.key === 'Enter')) {
            onAutocompletionElementSelect(value);
            event.preventDefault();
            return;
        }
        if (event.key === 'Tab') {
            clearAutocompletionElements();
            return;
        }
        const listElements = autocompletionList.value.querySelectorAll('li') as unknown as Array<HTMLLIElement>;
        let newIdx = currIdx;
        switch (event.key) {
            case 'ArrowDown':
                newIdx += 1;
                break;
            case 'ArrowUp':
                newIdx -= 1;
                break;
            case 'Escape':
                clearAutocompletionElements();
                event.stopPropagation();
                break;
            default:
        }
        setFocusToElem(listElements, newIdx);
        if (event.key !== 'Tab') {
            event.preventDefault();
        }
    }
};

const focusListElement = (idx: number): void => {
    if (autocompletionList.value != null) {
        const listElements = autocompletionList.value.querySelectorAll('li') as unknown as Array<HTMLLIElement>;
        if (listElements.length && idx < listElements.length) {
            setFocusToElem(listElements, idx);
        }
    }
};

const keyHandler = (event: KeyboardEvent): void => {
    if (autocompletionElements?.value.length) {
        switch (event.key) {
            case 'ArrowDown':
                focusListElement(0);
                event.preventDefault();
                break;
            case 'Tab':
                clearAutocompletionElements();
                break;
            case 'Escape':
                clearAutocompletionElements();
                event.preventDefault();
                break;
            case 'Enter':
                clearAutocompletionElements();
                break;
            default:
        }
    }
};

onClickOutside(inputElement, () => {
    clearAutocompletionElements();
});

</script>
<template>
    <div
        ref="inputElement"
    >
        <BaseFormInput
            v-bind="$attrs"
            :placeholder="inputPlaceholder"
            :is-disabled="isInputDisabled"
            :cursor-pointer="inputCursorPointer"
            :group="inputGroup"
            :model-value="modelValue"
            :error="inputErrorMessage"
            :is-focused="isInputFocused"
            :readonly="isInputReadonly"
            @input="onKeyPress($event.target.value)"
            @keydown="keyHandler($event)"
        />
    </div>
    <div>
        <BaseFixedContainer
            v-if="autocompletionElements?.length"
            :ref-element="inputElement"
            :full-border="true"
            data-testid="autocompletedElements"
            class="ShowAutocompletedElements"
        >
            <ul
                ref="autocompletionList"
                class="overflow-auto overflow-x-hidden bg-white"
            >
                <li
                    v-for="(entry, index) in autocompletionElements"
                    :key="entry"
                    class="h-8 w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap
                    px-4 pt-3 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
                    @keydown="listKeyHandler($event, entry, index)"
                    @click="onAutocompletionElementSelect(entry)"
                >
                    <span class="capitalize">{{ matchString(entry, modelValue || '').matched }}</span>
                    <span class="font-semiBold">{{ matchString(entry, modelValue || '').unmatched }}</span>
                </li>
            </ul>
        </BaseFixedContainer>
    </div>
</template>
