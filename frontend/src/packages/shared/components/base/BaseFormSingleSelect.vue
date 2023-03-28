<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import ArrowDownIcon from '../../assets/icons/ArrowDownIcon.vue';
import BaseFormLabel from './BaseFormLabel.vue';
import BaseFixedContainer from './BaseFixedContainer.vue';
import type { FilterLabelItem } from '../../types/applicant/types';

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    formLabel: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: 'w-[480px]',
    },
    height: {
        type: String,
        default: '',
    },
    entries: {
        type: Object as () => FilterLabelItem[] | undefined,
        default: undefined,
    },
    selected: {
        type: Object as () => FilterLabelItem | undefined,
        default: undefined,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    disabledEntries: {
        type: Object as () => FilterLabelItem[],
        default: null,
    },
    defaultChosenEntryId: {
        type: Number,
        default: null,
    },
    isToggle: {
        type: Boolean,
        default: false,
    },
    offsetTop: {
        type: Number,
        default: 0,
    },
    offsetLeft: {
        type: Number,
        default: 0,
    },
    offsetRight: {
        type: Number,
        default: 0,
    },
    fitContent: {
        type: Boolean,
        default: false,
    },
    greenText: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['selection']);

const isOpen = ref(false);
const chosenEntry: Ref<FilterLabelItem | undefined> = ref(undefined);
const container = ref(null);
const list: Ref<null | HTMLElement> = ref(null);
const button: Ref<null | HTMLElement> = ref(null);
const focusedListEntry: Ref<number | null> = ref(null);

const getEntryById = (id: number): FilterLabelItem | undefined => {
    const e = props.entries?.filter((x: FilterLabelItem) => x.id === id);
    if (e && e.length) {
        return e[0];
    }
    return undefined;
};

const entryClick = (id: number): void => {
    if (chosenEntry.value?.id === id) {
        chosenEntry.value = props.defaultChosenEntryId ? getEntryById(props.defaultChosenEntryId) : undefined;
    } else {
        chosenEntry.value = getEntryById(id);
    }
    emit('selection', chosenEntry.value);
};

const onCloseDropdown = (focusToButton?: boolean): void => {
    focusedListEntry.value = null;
    if (focusToButton && button.value) {
        setTimeout(() => {
            button.value?.focus();
        }, 0);
    }
};

const toggleDropdown = (focusToButton?: boolean): void => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
        onCloseDropdown(focusToButton);
    }
};

const setFocusToElem = (listElements: Array<HTMLLIElement>, idx: number): void => {
    if (idx < listElements.length && idx >= 0) {
        listElements[idx]?.setAttribute('tabindex', '0');
        if (focusedListEntry.value != null && focusedListEntry.value < listElements.length) {
            listElements[focusedListEntry.value].removeAttribute('tabindex');
        }
        listElements[idx].focus();
        focusedListEntry.value = idx;
    }
};

const isEntryDisabled = (entryId?: number): boolean => {
    if (props.disabledEntries && props.disabledEntries.length && entryId != null) {
        return !!props.disabledEntries.find(
            (x: FilterLabelItem) => x.id === entryId,
        );
    }
    return false;
};

const focusListElement = (idx: number): void => {
    if (list.value != null) {
        const listElements = list.value.querySelectorAll('li') as unknown as Array<HTMLLIElement>;
        if (listElements.length && idx < listElements.length) {
            setFocusToElem(listElements, idx);
        }
    }
};

const getEnabledNextIndex = (start: number, forward?: boolean, forceIterateOnce?: boolean): number => {
    let foundIndex = start;
    if (props.entries && props.entries.length) {
        let iteratedOnce = false;
        for (let idx = start; start >= 0 && start < props.entries.length; forward ? idx += 1 : idx -= 1) {
            if (!isEntryDisabled(props.entries[idx]?.id)) {
                foundIndex = idx;
                if (iteratedOnce || !forceIterateOnce) {
                    break;
                }
            }
            iteratedOnce = true;
        }
    }
    return foundIndex;
};

const keyHandler = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowDown') {
        if (!isOpen.value) {
            isOpen.value = true;
            setTimeout(() => focusListElement(getEnabledNextIndex(0, true)), 0);
        } else {
            focusListElement(getEnabledNextIndex(0, true));
        }
        event.preventDefault();
    }
};

const listKeyHandler = (event: KeyboardEvent, currIdx: number): void => {
    if (list.value) {
        if ((event.key === ' ' || event.key === 'Enter') && props.entries && props.entries.length > currIdx) {
            entryClick(props.entries[currIdx].id);
            event.preventDefault();
            return;
        }
        const listElements = list.value.querySelectorAll('li') as unknown as Array<HTMLLIElement>;
        let newIdx = currIdx;
        switch (event.key) {
            case 'Home':
                newIdx = getEnabledNextIndex(0, true);
                break;
            case 'End':
                newIdx = getEnabledNextIndex(listElements.length - 1, false);
                break;
            case 'ArrowDown':
                newIdx = getEnabledNextIndex(currIdx, true, true);
                break;
            case 'ArrowUp':
                newIdx = getEnabledNextIndex(currIdx, false, true);
                break;
            case 'Escape':
                toggleDropdown(true);
                // 'ESC' will not affect on closing modal as list is open
                event.stopPropagation();
                break;
            default:
        }
        if (newIdx !== focusedListEntry.value) {
            setFocusToElem(listElements, newIdx);
        }
        if (event.key !== 'Tab') {
            event.preventDefault();
        }
    }
};

onClickOutside(container, () => {
    isOpen.value = false;
    onCloseDropdown();
});

onMounted(() => {
    if (props.selected) {
        chosenEntry.value = props.selected;
    }
});
</script>
<template>
    <div
        ref="container"
        class="BaseFormSingleSelect relative max-w-[300px]"
        :class="[width, height]"
    >
        <BaseFormLabel
            :text="formLabel"
            :disabled="disabled"
        />
        <button
            ref="button"
            class="
            BaseFormSingleSelectButton
            relative
            h-[48px]
            w-full
            rounded-t-[4px]"
            :class="{
                'text-gray-400': disabled,
                'cursor-not-allowed': disabled,
                'border-b border-gray-300 bg-gray-50': !isToggle,
                'focus-within:border-blue-900 focus:border focus:outline-none': !isToggle,
                'text-gray-600' : isToggle && !greenText,
                'text-green-800': greenText && !disabled,
                'p-4' : !isToggle,
                'text-left': !isToggle
            }"
            :disabled="disabled"
            tabindex="0"
            @keydown="keyHandler($event)"
            @click="toggleDropdown(true)"
        >
            <div
                class="mr-4 overflow-hidden text-ellipsis whitespace-nowrap"
            >
                <span
                    v-if="!chosenEntry || isToggle"
                    :class="{'pr-[1.25rem]' : isToggle}"
                >
                    {{ label }}
                </span>
                <span v-else>
                    {{ chosenEntry.label }}
                </span>
            </div>
            <svg
                v-if="!disabled"
                class="absolute top-5 text-gray-700 duration-150 ease-in"
                :class="{
                    'rotate-180' : isOpen,
                    'rotate-0' : !isOpen,
                    'right-0' : isToggle,
                    'right-4' : !isToggle
                }"
                viewBox="0 0 16 16"
                width="16"
            >
                <ArrowDownIcon/>
            </svg>
        </button>
        <BaseFixedContainer
            v-if="isOpen"
            :ref-element="button"
            :class="{'shadow' : isToggle}"
            :max-height="240"
            :offset-top="offsetTop"
            :offset-right="offsetRight"
            :offset-left="offsetLeft"
            :fit-content="fitContent"
            @outside-scroll-or-resize="() => isOpen = false"
        >
            <ul
                v-if="isOpen && entries?.length"
                ref="list"
                class="overflow-auto overflow-x-hidden"
                :class="{
                    'bg-gray-50 pt-2': !isToggle,
                    'bg-white': isToggle,
                    'border-t border-gray-300': isToggle,

                }"
            >
                <li
                    v-for="(entry, index) in entries"
                    :key="entry.id"
                    :data-testid="'li ' + entry.label"
                    class="h-8 w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap
                    px-4 pt-3 focus:outline-none"
                    :class="{
                        'font-semiBold': chosenEntry?.id === entry.id,
                        'text-gray-300': disabledEntries && disabledEntries.length && !!disabledEntries.find(
                            (x: FilterLabelItem) => x.id === entry.id),
                        'hover:bg-gray-200 focus:bg-gray-200': !(disabledEntries && disabledEntries.length
                            && !!disabledEntries.find(
                                (x: FilterLabelItem) => x.id === entry.id)),
                    }"
                    @keydown="listKeyHandler($event, index)"
                    @click="isEntryDisabled(entry.id) ? null : entryClick(entry.id)"
                >
                    <span>
                        {{ entry.label }}
                    </span>
                </li>
            </ul>
        </BaseFixedContainer>
    </div>
</template>
