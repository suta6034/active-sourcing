<script setup lang="ts">
import {
    ref, type Ref,
} from 'vue';

import { useLang } from '../../../composables/i18n';

import type { TimeLineEntry, SubTitle } from './types';

const { t } = useLang();

defineProps({
    entry: {
        type: Object as () => TimeLineEntry,
        default: null,
    },
});

const showDescription: Ref<boolean> = ref(false);

const renderSubTitle = (subTitle: string | SubTitle | null) => {
    if (typeof subTitle === 'object' && subTitle !== null) {
        return (subTitle as SubTitle).value;
    }
    return subTitle;
};

const linkWithProtocol = (url:string): string => {
    if (!/^(ht)tps?:\/\//.test(url)) {
        return `http://${url}`;
    }

    return url;
};
</script>
<template>
    <div
        v-if="!!entry"
        class="BaseTimeLineEntry"
    >
        <template v-if="!!entry.dateHeading">
            <span
                class="timeLineEntryDateHeading text-small tracking-[-0.09px] text-gray-600"
            >
                {{ entry.dateHeading }}
            </span>
            <br>
        </template>
        <template v-if="!!entry.title">
            <span
                class="timeLineEntryTitle font-semiBold tracking-[-0.1px]"
            >
                {{ entry.title }}
            </span>
            <br>
        </template>
        <template v-if="!!entry.subTitle">
            <template v-if="!(entry.subTitle as SubTitle)?.hidden">
                <a
                    v-if="typeof entry.subTitle === 'object' && entry.subTitle !== null"
                    class="timeLineEntrySubTitleLink text-small tracking-[-0.1px] text-gray-400"
                    :href="linkWithProtocol(renderSubTitle(entry.subTitle) || '')"
                    target="_blank"
                    rel="noopener"
                    data-testId="test1"
                >
                    {{ renderSubTitle(entry.subTitle) }}
                </a>
                <span
                    v-else
                    class="timeLineEntrySubTitleText text-small tracking-[-0.1px] text-gray-400"
                >
                    {{ renderSubTitle(entry.subTitle) }}
                </span>
            </template>
            <template v-else>
                <span
                    class="timeLineEntrySubTitleLinkHidden text-small tracking-[-0.1px] text-gray-400 underline"
                >
                    {{ t('button', 'linkHidden') }}
                </span>
            </template>
            <br>
        </template>
        <template v-if="!!entry.description">
            <div
                v-if="showDescription"
                class="timeLineEntryDescription text-small tracking-[-0.1px]"
            >
                {{ entry.description }}
            </div>
            <span
                class="timeLineEntryShowDetails cursor-pointer text-small tracking-[-0.1px] text-gray-600 underline"
                role="button"
                @click="showDescription = !showDescription"
            >
                {{ !showDescription ? t('button', 'showDetails') : t('button', 'hideDetails') }}&hellip;
            </span>
        </template>
    </div>
</template>
