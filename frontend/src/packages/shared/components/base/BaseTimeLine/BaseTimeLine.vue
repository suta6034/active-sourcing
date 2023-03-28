<script setup lang="ts">
import BaseTimeLineEntry from './BaseTimeLineEntry.vue';

import type { TimeLineEntry } from './types';

defineProps({
    entries: {
        type: Object as () => Array<TimeLineEntry>,
        default: null,
    },
});
</script>
<template>
    <div class="BaseTimeLine">
        <template v-if="entries?.length">
            <div
                v-for="(entry, index) in entries"
                :key="entry.id"
            >
                <div class="relative ml-[8px] flex flex-row">
                    <div
                        class="absolute mr-[20px] h-full border-l border-blue-900"
                        :class="{
                            'mt-[9px]': index === 0,
                            'h-[9px]': index === entries.length - 1
                        }"
                    >
                        <span
                            class="absolute right-[-4px] h-[9px] w-[9px] rounded-[9px] bg-blue-900"
                            :class="{
                                'top-0': index === 0,
                                'top-[9px]': index !== 0,
                            }"
                        />
                    </div>
                    <div
                        class="max-w-[375px] pl-[20px]"
                        :class="{
                            'pb-[16px]': index !== entries.length - 1
                        }"
                    >
                        <BaseTimeLineEntry :entry="entry"/>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style>
.BaseTimeLine {
    word-break: break-word;
}
</style>
