<script setup lang="ts">
import {
    onMounted, ref, type Ref, watch,
} from 'vue';
import type { Experience, FilterLabelItem, Range } from '../../../shared/types/applicant/types';
import { useFilter } from '../../../shared/composables/filter';
import { useLang } from '../../../shared/composables/i18n';

import ApplicantFilterExperienceItem from './ApplicantFilterExperienceItem.vue';

const { t } = useLang();
const {
    updateFilter,
    getFilterLabelItems,
} = useFilter();

type ExperienceFilterItem = {
    jobField?: FilterLabelItem,
    months?: Range,
};

const props = defineProps({
    selected: {
        type: Object as () => Array<Experience> | undefined,
        default: undefined,
    },
});

const emit = defineEmits(['isValid']);

const curExperiences: Ref<Array<ExperienceFilterItem | undefined> | undefined> = ref(undefined);
const jobFieldItems: Ref<Array<FilterLabelItem>> = ref([]);
const validation: Ref<Array<number>> = ref([]);

function convertMonthsToYears(months: Range | undefined): Range {
    const from = months?.from ? months.from * 12 : 0;
    const to = months?.to ? months.to * 12 : 480;
    return { from, to };
}

function convertYearsToMonths(months: Range | undefined | null): Range {
    const from = months?.from || months?.from === 0 ? months.from / 12 : undefined;
    const to = months?.to ? months.to / 12 : undefined;
    return { from, to };
}

function updateExperienceFilter(): void {
    const experienceFilters: Array<Experience> = [];
    if (curExperiences.value?.length) {
        for (const experience of curExperiences.value) {
            if (experience && experience.jobField?.id) {
                experienceFilters.push({
                    jobFieldId: experience.jobField.id,
                    months: experience.months,
                });
            } else {
                experienceFilters.push({} as Experience);
            }
        }
    }
    updateFilter({ group: 'experiences', id: experienceFilters });
    emit('isValid', validation.value.length === 0);
}

function addExperience(): void {
    if (!curExperiences.value) {
        curExperiences.value = [] as Array<ExperienceFilterItem | undefined>;
    }
    if (curExperiences.value.length < 3) {
        curExperiences.value.push(undefined);
    }
    updateExperienceFilter();
}

function deleteExperience(index: number): void {
    if (curExperiences.value && curExperiences.value.length > index) {
        const validationValue = curExperiences.value[index];
        if (validationValue) {
            const validationIndex = validation.value?.findIndex((val) => val === validationValue?.jobField?.id);
            if (validationIndex >= 0) {
                validation.value.splice(validationIndex, 1);
            }
        }
        curExperiences.value.splice(index, 1);
    }
    updateExperienceFilter();
}

function setLevel(selection: Range | undefined, index: number): void {
    if (curExperiences.value && curExperiences.value.length > index && curExperiences.value[index] != null) {
        (curExperiences.value[index] as ExperienceFilterItem).months = convertMonthsToYears(selection);
    }
    updateExperienceFilter();
}

function setJobField(selection: FilterLabelItem | null, index: number): void {
    if (curExperiences.value && curExperiences.value.length > index) {
        if (selection == null) {
            const selectedValue = curExperiences.value[index];
            validation.value.splice(validation.value.findIndex((val) => val === selectedValue?.jobField?.id), 1);
            curExperiences.value[index] = undefined;
        } else if (curExperiences.value[index] != null) {
            (curExperiences.value[index] as ExperienceFilterItem).jobField = selection;
        } else {
            curExperiences.value[index] = {
                jobField: selection,
                months: { from: 0, to: 480 },
            };
        }
    }
    updateExperienceFilter();
}

function getFilterLabelItemById(id?: number): FilterLabelItem | undefined {
    if (id != null) {
        const labels = jobFieldItems.value;
        const item = labels.filter((x: FilterLabelItem) => x.id === id);
        if (item.length) {
            return item[0];
        }
    }
    return undefined;
}

function calcCurrExperiences(value: Array<Experience> | undefined): void {
    if (value) {
        curExperiences.value = [];
        for (const experience of value) {
            if (experience.jobFieldId) {
                curExperiences.value.push({
                    jobField: getFilterLabelItemById(experience.jobFieldId),
                    months: experience.months,
                });
            } else {
                curExperiences.value.push(undefined);
            }
        }
    } else {
        curExperiences.value = undefined;
    }
}

function getDisabledFilterItems(chosenEntryId?: number): Array<FilterLabelItem> {
    let disabledItems: Array<FilterLabelItem> = [];
    if (curExperiences.value && curExperiences.value.length) {
        disabledItems = jobFieldItems.value.filter(
            (experienceItem: FilterLabelItem) => (chosenEntryId == null || experienceItem.id !== chosenEntryId)
                && !!curExperiences.value?.find(
                    (currLang: ExperienceFilterItem | undefined) => currLang?.jobField?.id === experienceItem.id,
                ),
        );
    }
    return disabledItems;
}

function setFilterItemValidation(chosenEntryId: FilterLabelItem | undefined, isValid: boolean) {
    if (chosenEntryId) {
        const index = validation.value.findIndex((val) => val === chosenEntryId.id);
        if (!isValid && index < 0) {
            validation.value.push(chosenEntryId.id);
        } else if (index >= 0) {
            validation.value.splice(index, 1);
        }
    }
    emit('isValid', validation.value.length === 0);
}

watch(() => props.selected, (newValue) => {
    calcCurrExperiences(newValue);
});

onMounted(() => {
    jobFieldItems.value = getFilterLabelItems('jobFields') || [];
    calcCurrExperiences(props.selected);
});

</script>
<template>
    <div>
        <ApplicantFilterExperienceItem
            v-for="(experience, index) in curExperiences"
            :key="experience?.jobField?.label"
            :selected-job-field="experience?.jobField"
            :selected-job-level="convertYearsToMonths(experience?.months)"
            :job-fields="jobFieldItems"
            :disabled-entries="getDisabledFilterItems(experience?.jobField?.id)"
            @delete="deleteExperience(index)"
            @job-field="setJobField($event, index)"
            @months="setLevel($event, index)"
            @is-valid="setFilterItemValidation(experience?.jobField, $event)"
        />
    </div>
    <div
        v-if="!curExperiences || curExperiences.length < 3"
        class="mt-5"
    >
        <button
            class="AddExperience tracking-[-0.1px] text-gray-600 underline hover:text-green-800"
            @click="addExperience"
        >
            {{ t('button', 'addExperience') }}
        </button>
    </div>
</template>
