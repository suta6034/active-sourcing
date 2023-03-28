<script setup lang="ts">
import {
    computed, type Ref, ref,
} from 'vue';
import { onClickOutside } from '@vueuse/core';

import { useLang } from '../../composables/i18n';
import { useFilter } from '../../composables/filter';

import ArrowDownIcon from '../../assets/icons/ArrowDownIcon.vue';
import BaseFormCheckboxList from './BaseFormCheckboxList.vue';
import BasePill from './BasePill.vue';
import BaseFormLabel from './BaseFormLabel.vue';
import BaseFixedContainer from './BaseFixedContainer.vue';

import type { FilterLabel } from '../../types/applicant/types';

const props = defineProps({
    offsetLeft: {
        type: Number,
        default: 0,
    },
    offsetTop: {
        type: Number,
        default: 0,
    },
    labels: {
        type: Object as () => FilterLabel,
        default: null,
    },
    entries: {
        type: Object as () => number[] | string[],
        default: Array,
    },
    group: {
        type: String,
        default: '',
        required: true,
    },
    formLabel: {
        type: String,
        default: null,
    },
    placeholderLabel: {
        type: String,
        default: null,
    },
});

defineEmits(['updateFilter']);

const { t } = useLang();

const { getLabelForFilter } = useFilter();

const formContainerRef = ref(null);

const isShow = ref(false);

const entries = computed(() => props.entries);

const btn: Ref<null | HTMLElement> = ref(null);

const toggleDropdown = () => {
    isShow.value = !isShow.value;
};

const listKeyHandler = (event:KeyboardEvent) => {
    if (event.key === 'Escape') {
        toggleDropdown();
        // 'ESC' will not affect on closing modal as list is open
        event.stopPropagation();
    }
    return null;
};

const maxShownElement = ref(1);
const selectedLabels = computed(() => {
    const newArray: string[] = [];
    props.entries.forEach((id) => {
        newArray.push(getLabelForFilter(props.labels.name, id));
    });
    return newArray;
});
const hasSelectedOptions = computed(() => selectedLabels.value.length > 0);
const isOverflowing = computed(() => selectedLabels.value.length > maxShownElement.value);
const numberOfOverflownItems = computed(() => selectedLabels.value.length - maxShownElement.value);

onClickOutside(formContainerRef, () => {
    isShow.value = false;
});

</script>
<template>
    <div
        ref="formContainerRef"
        class="BaseFormMultiSelect relative w-[300px]"
    >
        <BaseFormLabel :text="formLabel"/>
        <button
            ref="btn"
            type="button"
            class="BaseFormMultiSelectButton h-9 w-full cursor-pointer border-gray-300 bg-gray-50 px-4"
            :class="{
                'border-b-0': true,
                'border-b rounded-t': true,
            }"
            :data-testid="'BaseFormMultiSelect ' + group"
            @click="toggleDropdown"
        >
            <div
                class="flex"
            >
                <div class="flex grow items-center">
                    <!-- normal case -->
                    <template v-if="offsetLeft === 0">
                        <div
                            v-if="!hasSelectedOptions"
                            class="text-base"
                        >
                            {{ placeholderLabel }}
                        </div>
                        <div
                            v-else
                            class="flex max-w-[242px]"
                        >
                            <BasePill
                                :has-margin-right="isOverflowing"
                                :selected-label="selectedLabels[maxShownElement -1]"
                            />

                            <div
                                v-if="isOverflowing"
                                class="shrink-0"
                            >
                                <BasePill
                                    total-hidden-item-pill
                                    :selected-label="`+${numberOfOverflownItems}`"
                                />
                            </div>
                        </div>
                    </template>
                    <!-- keyword filter -->
                    <template v-else>
                        <div
                            class="text-gray-600"
                        >
                            {{ placeholderLabel }}
                        </div>
                        <div
                            v-if="!isOverflowing"
                            class="ml-4 flex text-base text-gray-600"
                        >
                            <template
                                v-for="selectedLabel in selectedLabels"
                                :key="selectedLabel"
                            >
                                {{ selectedLabel }}
                            </template>
                        </div>
                        <div
                            v-else
                            class="ml-4 text-base text-gray-600"
                        >
                            {{ selectedLabels.length }} {{ t('label','fields') }}
                        </div>
                    </template>
                </div>
                <div class="ml-5 flex w-[1rem] shrink-0">
                    <svg
                        class="text-gray-700 duration-150 ease-in"
                        :class="`${isShow ? 'rotate-180' : 'rotate-0'}`"
                        viewBox="0 0 16 16"
                    >
                        <ArrowDownIcon/>
                    </svg>
                </div>
            </div>
        </button>
        <BaseFixedContainer
            v-if="isShow"
            :ref-element="btn"
            :offset-top="offsetTop"
            :offset-left="offsetLeft"
            :max-height="240"
            @outside-scroll-or-resize="() => isShow = false"
        >
            <BaseFormCheckboxList
                :entries="entries"
                :labels="labels"
                :group="group"
                @update-filter="$emit('updateFilter',$event)"
                @list-key-handler="listKeyHandler"
            />
        </BaseFixedContainer>
    </div>
</template>
