<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '../../../../shared/composables/i18n';
import { useApplicant } from '../../../../shared/composables/applicant';
import { useFilter } from '../../../../shared/composables/filter';

import ApplicantFilterExactSearch from '../ApplicantFilterExactSearch.vue';
import ApplicantFilterRangeInput from '../ApplicantFilterRangeInput.vue';
import ApplicantFilterEmployment from '../ApplicantFilterEmployment.vue';
import ApplicantFilterDropdownInput from '../ApplicantFilterDropdownInput.vue';
import ApplicantFilterLanguage from '../ApplicantFilterLanguage.vue';
import ApplicantFilterKeyword from '../ApplicantFilterKeyword.vue';
import ApplicantFilterExperience from '../ApplicantFilterExperience.vue';
import ApplicantFilterReadyToMove from '../ApplicantFilterReadyToMove.vue';
import ApplicantFilterModalContainer from './ApplicantFilterModalContainer.vue';
import ApplicantFilterSlider from '../ApplicantFilterSlider.vue';

import type { FilterLabel } from '../../../../shared/types/applicant/types';

const { t } = useLang();

const {
    search,
} = useApplicant();

const {
    filter,
    updateFilter,
    resetModalFilter,
} = useFilter();

const props = defineProps({
    allFiltersLabels: {
        type: Object as () => FilterLabel[],
        default: null,
    },
});

const emit = defineEmits(['closeModal']);

const getTargetLabels = (targetFilter: string) => props.allFiltersLabels.find((item) => item.name === targetFilter);

const isFilterExperiencesValid = ref(true);
const isFilterSalaryValid = ref(true);

function setExperienceValidation(value: boolean) {
    isFilterExperiencesValid.value = value;
}
function setSalaryValidation(value: boolean) {
    isFilterSalaryValid.value = value;
}

function checkValidation() {
    return isFilterSalaryValid.value && isFilterExperiencesValid.value;
}

const triggerSearch = async () => {
    if (checkValidation()) {
        await search(filter.value);
        emit('closeModal');
    }
};
</script>
<template>
    <div
        data-testid="ApplicantFilterModal"
        class="ApplicantFilterModal flex h-full flex-col"
    >
        <ApplicantFilterModalContainer>
            <template #header>
                {{ t('label', 'filterTitle') }}
            </template>
            <template #cv>
                <ApplicantFilterExperience
                    :selected="filter.experiences"
                    @is-valid="setExperienceValidation($event)"
                />
                <div class="mt-6 flex flex-col border-t-[1px] pt-6 md:flex-row">
                    <div class="mr-6 w-full md:w-1/2">
                        <ApplicantFilterDropdownInput
                            :labels="getTargetLabels('educationGroups')"
                            :filter="filter"
                            group="educationGroups"
                            label="education"
                            @update-filter="updateFilter"
                        />
                    </div>
                    <div class="mt-5 ml-0 w-full md:mx-6 md:mt-0 md:w-1/2">
                        <ApplicantFilterDropdownInput
                            :labels="getTargetLabels('branches')"
                            :filter="filter"
                            group="branches"
                            label="branches"
                            @update-filter="updateFilter"
                        />
                    </div>
                </div>
                <ApplicantFilterLanguage :selected="filter.languages"/>
                <ApplicantFilterSlider
                    :target-value="filter.willingnessToTravel"
                    group="willingnessToTravel"
                    label="willingnessToTravel"
                    @update-filter="updateFilter"
                />
                <ApplicantFilterSlider
                    :target-value="filter.homeoffice"
                    group="homeoffice"
                    label="homeoffice"
                    @update-filter="updateFilter"
                />
            </template>
            <template #keyDate>
                <div class="flex flex-col pb-5 md:flex-row">
                    <div class="mr-6 w-full md:w-1/2">
                        <ApplicantFilterEmployment
                            :labels="getTargetLabels('employmentTypes')"
                            label="employmentTypes"
                            :filter="filter"
                            group="employmentTypes"
                            @update-filter="updateFilter"
                        />
                    </div>
                    <div class="mt-5 ml-0 flex w-full md:ml-6 md:mt-0 md:w-1/2">
                        <ApplicantFilterRangeInput
                            :from="filter.salary.from || undefined"
                            :to="filter.salary.to || undefined"
                            :unit="true"
                            placeholder-from="0"
                            group="salary"
                            :allow-only-integer="true"
                            @update-filter="updateFilter"
                            @is-valid="setSalaryValidation($event)"
                        />
                    </div>
                </div>
                <ApplicantFilterReadyToMove/>
            </template>
            <template #refineSearch>
                <div class="flex pb-5">
                    <div class="mr-0 w-full md:mr-6">
                        <ApplicantFilterKeyword
                            :offset-left="57"
                            :offset-top="7"
                            :labels="getTargetLabels('keywordFilters')"
                            :entries="filter.keywordFilters"
                            group="keywordFilters"
                            @update-filter="updateFilter"
                        />
                    </div>
                </div>
                <ApplicantFilterExactSearch/>
            </template>
            <template #footer>
                <button
                    class="text-gray-600 underline hover:text-green-800"
                    @click="resetModalFilter"
                >
                    {{ t('button', 'filterReset') }}
                </button>
                <button
                    :disabled="!checkValidation()"
                    data-testid="ApplicantFilterModal search button"
                    class="
                    ml-[39px]
                    h-[48px]
                    rounded
                    bg-green-600
                    px-5
                    py-3
                    text-white
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:bg-gray-500
                    2xl:ml-0"
                    @click="triggerSearch"
                >
                    {{ t('button', 'filterSearch') }}
                </button>
            </template>
        </ApplicantFilterModalContainer>
    </div>
</template>
