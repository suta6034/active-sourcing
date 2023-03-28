<script setup lang="ts">
import {
    ref,
    watch,
} from 'vue';

import { useLang } from '../../composables/i18n';

import CheckboxIcon from '../../assets/icons/CheckboxIcon.vue';

const props = defineProps({
    entries: {
        type: Object as () => number[] | string[],
        default: Array,
    },
    labels: {
        type: Object,
        default: null,
        required: true,
    },
    group: {
        type: String,
        default: '',
        required: true,
    },
    isNested: {
        type: Boolean,
        default: true,
    },
    maxShowItems: {
        type: Number as () => number | null,
        default: null,
    },
});

defineEmits(['updateFilter', 'expandList', 'listKeyHandler']);

const {
    t,
} = useLang();

const entries = ref(props.entries);

const maxShowItems = ref(props.maxShowItems);

const expandList = () => {
    maxShowItems.value = props.labels.items.length;
};

// It guarantees that all checkboxes are reactive with binding data
watch(() => props.entries, (newValue) => {
    entries.value = newValue;
});

</script>

<template>
    <ul
        v-bind="$attrs"
        :data-testid="'BaseFormCheckboxList ' + group"
        class="BaseFormCheckboxList list-none overflow-x-hidden bg-white"
        :class="{
            'pt-[5px] bg-gray-50': isNested,
        }"
    >
        <li
            v-for="(item, index) in labels?.items"
            v-show="maxShowItems !== null ? index < maxShowItems : true"
            :key="item"
            class="flex items-center font-regular text-base"
            :class="`
                    ${isNested ? 'h-[40px] text-[16px] tracking-[-0.1px]'
            : 'h-[2rem] text-small'}
                    `"
            @keydown="$emit('listKeyHandler',$event)"
        >
            <label
                class="
                inputContainer
                group
                relative
                flex
                h-full
                w-full
                cursor-pointer
                select-none
                items-center
                justify-start
                focus-within:bg-gray-200
                "
                :class="{
                    'px-[11px] hover:bg-gray-200': isNested,
                }"
            >
                <input
                    v-model="entries"
                    type="checkbox"
                    :value="item.id"
                    class="peer absolute h-0 w-0 opacity-0"
                    @change="$emit('updateFilter',{
                        group,
                        id: item.id,
                    })"
                >
                <div
                    class="
                    checkmark
                    group-hover:border
                    group-hover:border-blue-900
                    group-hover:bg-white
                    peer-checked:border-none
                    peer-checked:bg-blue-900"
                    :class="`h-[16px] w-[16px] min-h-[16px] min-w-[16px] rounded bg-white border border-gray-300`"
                >
                    <svg
                        class="h-full w-full text-white"
                        viewBox="0 0 13 17.5"
                    >
                        <CheckboxIcon/>
                    </svg>
                </div>
                <div class="max-w-[255px] overflow-hidden truncate pl-3">
                    {{ item.label }}
                </div>
            </label>
        </li>
        <button
            v-if="maxShowItems !== null && maxShowItems !== labels?.items?.length"
            class="pl-6 text-small text-gray-600 underline"
            @click="expandList"
        >
            ...{{ t('button','more') }}
        </button>
    </ul>
</template>
