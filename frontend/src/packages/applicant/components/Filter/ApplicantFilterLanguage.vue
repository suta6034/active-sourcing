<script setup lang="ts">
import {
    onMounted, ref, watch, type Ref,
} from 'vue';

import type { FilterLabelItem } from '@/packages/shared/types/applicant/types';
import { useFilter } from '../../../shared/composables/filter';
import { useLang } from '../../../shared/composables/i18n';

import ApplicantFilterLanguageItem from './ApplicantFilterLanguageItem.vue';

type LanguageFilterItem = {
    language?: FilterLabelItem,
    level?: FilterLabelItem,
};

const { t } = useLang();
const {
    updateFilter,
    getFilterLabelItems,
} = useFilter();

const props = defineProps({
    selected: {
        type: Object as () => Array<Record<string, number>> | undefined,
        default: undefined,
    },
});

const currLangs: Ref<Array<LanguageFilterItem | undefined> | undefined> = ref(undefined);
const languageItems: Ref<Array<FilterLabelItem>> = ref([]);
const levelItems: Ref<Array<FilterLabelItem>> = ref([]);

function updateLanguageFilter(): void {
    const languageFilter: Array<Record<string, number>> = [];
    if (currLangs.value?.length) {
        for (const lang of currLangs.value) {
            if (lang && lang.language) {
                languageFilter.push({
                    id: lang.language.id,
                    levelId: lang.level ? lang.level.id : levelItems.value[0].id,
                });
            } else {
                languageFilter.push({});
            }
        }
    }
    updateFilter({ group: 'languages', id: languageFilter });
}

function addLanguage(): void {
    if (!currLangs.value) {
        currLangs.value = [] as Array<LanguageFilterItem | undefined>;
    }
    if (currLangs.value.length < 3) {
        currLangs.value.push(undefined);
    }
    updateLanguageFilter();
}

function deleteLanguage(index: number): void {
    if (currLangs.value && currLangs.value.length > index) {
        currLangs.value.splice(index, 1);
    }
    updateLanguageFilter();
}

function setLanguage(selection: FilterLabelItem | undefined, index: number): void {
    if (currLangs.value && currLangs.value.length > index) {
        if (selection == null) {
            currLangs.value[index] = undefined;
        } else if (currLangs.value[index] != null) {
            (currLangs.value[index] as LanguageFilterItem).language = selection;
        } else {
            currLangs.value[index] = {
                language: selection,
            };
        }
    }
    updateLanguageFilter();
}
function setLevel(selection: FilterLabelItem, index: number): void {
    if (currLangs.value && currLangs.value.length > index && currLangs.value[index] != null) {
        (currLangs.value[index] as LanguageFilterItem).level = selection;
    }
    updateLanguageFilter();
}

function getFilterLabelItemById(id?: number, isLanguageItem?: boolean): FilterLabelItem | undefined {
    if (id != null) {
        const labels = isLanguageItem ? languageItems.value : levelItems.value;
        const item = labels.filter((x: FilterLabelItem) => x.id === id);
        if (item.length) {
            return item[0];
        }
    }
    return undefined;
}

function calcCurrLanguages(value: Array<Record<string, number>> | undefined): void {
    if (value) {
        currLangs.value = [];
        for (const selectedLang of value) {
            if (selectedLang.id) {
                currLangs.value.push({
                    language: getFilterLabelItemById(selectedLang.id, true),
                    level: getFilterLabelItemById(selectedLang.levelId),
                });
            } else {
                currLangs.value.push(undefined);
            }
        }
    } else {
        currLangs.value = undefined;
    }
}

function getDisabledFilterItems(chosenEntryId?: number): Array<FilterLabelItem> {
    let disabledItems: Array<FilterLabelItem> = [];
    if (currLangs.value && currLangs.value.length) {
        disabledItems = languageItems.value.filter(
            (languageItem: FilterLabelItem) => (chosenEntryId == null || languageItem.id !== chosenEntryId)
                && !!currLangs.value?.find(
                    (currLang: LanguageFilterItem | undefined) => currLang?.language?.id === languageItem.id,
                ),
        );
    }
    return disabledItems;
}

watch(() => props.selected, (newValue) => {
    calcCurrLanguages(newValue);
});

onMounted(() => {
    languageItems.value = getFilterLabelItems('languages') || [];
    levelItems.value = getFilterLabelItems('languageLevels') || [];
    calcCurrLanguages(props.selected);
});
</script>
<template>
    <div>
        <ApplicantFilterLanguageItem
            v-for="(lang, index) in currLangs"
            :key="lang?.language?.id + (lang?.level ? '|' + lang.level.id : '')"
            :selected-lang="lang?.language"
            :selected-level="lang?.language ? lang.level : undefined"
            :default-level="levelItems[0]"
            :languages="languageItems"
            :levels="levelItems"
            :disabled-entries="getDisabledFilterItems(lang?.language?.id)"
            @delete="deleteLanguage(index)"
            @language="setLanguage($event, index)"
            @level="setLevel($event, index)"
        />
    </div>
    <div
        v-if="!currLangs || currLangs.length < 3"
        class="mt-5"
    >
        <button
            class="AddLanguage tracking-[-0.1px] text-gray-600 underline hover:text-green-800"
            @click="addLanguage"
        >
            {{ t('button', 'addLanguage') }}
        </button>
    </div>
</template>
