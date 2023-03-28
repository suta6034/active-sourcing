<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';
import { useFilter } from '../../../shared/composables/filter';

import BaseToggleButton from '../../../shared/components/base/BaseToggleButton.vue';

const {
    t,
} = useLang();

const {
    filter: filterOptions,
} = useFilter();

async function toggleExactSearch(doExactSearch: boolean): Promise<void> {
    let currKeyword = filterOptions.value.keyword;
    if (currKeyword && currKeyword.length) {
        currKeyword = currKeyword.replace(/['"]+/g, '');
        if (doExactSearch) {
            currKeyword = `"${currKeyword}"`;
        }
    }
    filterOptions.value.keyword = currKeyword;
    filterOptions.value.exactSearch = doExactSearch;
}
</script>
<template>
    <BaseToggleButton
        :state="filterOptions.exactSearch"
        data-testid="ApplicantFilterExactSearch toggle button"
        :label-text="t('label','exactWording')"
        @toggle="toggleExactSearch"
    />
</template>
