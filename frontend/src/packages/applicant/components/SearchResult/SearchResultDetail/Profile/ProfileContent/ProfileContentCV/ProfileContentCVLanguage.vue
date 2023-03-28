<script setup lang="ts">
import { computed } from 'vue';
import { useFilter } from '../../../../../../../shared/composables/filter';

import type { LanguagesEntry } from '../../../../../../../shared/types/profile/types';

const props = defineProps({
    entries: {
        type: Object as () => Array<LanguagesEntry>,
        default: null,
    },
});

const { getLabelForFilter } = useFilter();

const languages = computed(() => {
    const languageArray: Array<string> = [];
    const sortedEntries = props.entries;
    sortedEntries.sort((a: LanguagesEntry, b: LanguagesEntry) => {
        if (a.levelId > b.levelId) {
            return -1;
        }
        if (a.levelId < b.levelId) {
            return 1;
        }
        return 0;
    });
    for (const entry of sortedEntries) {
        let language = getLabelForFilter('languages', entry.id);
        language += `, ${getLabelForFilter('languageLevels', entry.levelId)}`;
        languageArray.push(language);
    }
    return languageArray;
});

</script>
<template>
    <div class="ProfileContentCVLanguage">
        <div
            v-for="language in languages"
            :key="language"
        >
            <span>
                {{ language }}
            </span>
        </div>
    </div>
</template>
