<script setup lang="ts">
import {
    ref, watchEffect, type Ref,
} from 'vue';
import type { Tab } from '../../types/base/types';

const props = defineProps({
    tabs: {
        type: Object as () => Array<Tab>,
        default: null,
    },
});

const emit = defineEmits(['selectTab']);

const tabElements: Ref<Array<Tab>> = ref([]);

const onTabClick = (selectedId: number): void => {
    for (const tab of tabElements.value) {
        tab.active = tab.id === selectedId;
    }
    emit('selectTab', selectedId);
};

watchEffect(() => {
    tabElements.value = props.tabs;
});
</script>
<template>
    <div class="h-[60px] bg-[white]">
        <ul
            v-if="tabElements?.length"
            class="BaseTabList hideScrollBar flex h-full overflow-x-scroll pl-9"
        >
            <li
                v-for="tab of tabElements"
                :key="tab.id"
                class="
                BaseTabListEntry
                mr-11
                h-full
                cursor-pointer
                whitespace-nowrap
                px-1
                pt-[20px]
                pb-5
                tracking-[-0.1px]"
                :class="{
                    'Active text-green-800 border-b border-green-800': tab.active,
                    'Inactive text-gray-300': !tab.active,
                    'Disabled text-gray-300 cursor-not-allowed': tab.disabled,
                }"
                @click="tab.disabled ? '' : onTabClick(tab.id)"
            >
                {{ tab.label }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.hideScrollBar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.hideScrollBar::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
