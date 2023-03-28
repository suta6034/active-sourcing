<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, maxLength } from '@vuelidate/validators';
import { computed, ref, type Ref } from 'vue';

import { BREAKPOINTS, useBreakpoint } from '../../../shared/composables/breakpoint';
import { useApplicant } from '../../../shared/composables/applicant';
import { useFilter } from '../../../shared/composables/filter';
import { useLang } from '../../../shared/composables/i18n';

import BaseFormInputAutocompletion from '../../../shared/components/base/BaseFormInputAutocompletion.vue';
import BaseButtonOnlyIcon from '../../../shared/components/base/BaseButtonOnlyIcon.vue';
import BaseButton from '../../../shared/components/base/BaseButton.vue';
import ApplicantFilterNearbySearch from '../Filter/ApplicantFilterNearbySearch.vue';
import MagnifierIcon from '../../../shared/assets/icons/MagnifierIcon.vue';
import { AUTOCOMPLETION_TYPES } from '../../../shared/composables/autocompletion';

defineProps({
    isExtended: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['extendHeader', 'filterButtonClick']);

const {
    t,
} = useLang();

const {
    filter,
    updateFilter,
} = useFilter();

const {
    search: triggerSearch,
} = useApplicant();

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);

const rules = computed(() => ({
    keyword: {
        maxLength: helpers.withMessage(
            ({ $params }) => `${t('validation', 'maxLengthCharacters', { length: $params.max })}`,
            maxLength(5000),
        ),
    },
    location: {
        name: {
            maxLength: helpers.withMessage(
                ({ $params }) => `${t('validation', 'maxLengthCharacters', { length: $params.max })}`,
                maxLength(5000),
            ),
        },
    },
}));
const $v = useVuelidate(rules, filter.value);

const extendSearchField = (value: boolean) => {
    emits('extendHeader', value);
};

const searchTimeout: Ref<number | null> = ref(null);

const search = async () => {
    const validatedResult = await $v.value.$validate();
    if (validatedResult) {
        if (searchTimeout.value) {
            clearTimeout(searchTimeout.value);
        }
        searchTimeout.value = window.setTimeout(async () => {
            await triggerSearch(filter.value);
            searchTimeout.value = null;

            extendSearchField(false);
        }, 0);
    }
};
</script>
<template>
    <form
        class="Searchbar flex h-auto w-full 2xl:flex-row"
        :class="{
            'flex-col': isExtended && !isTwoXLScreen,
        }"
        data-testid="Searchbar"
        @submit.prevent="search"
    >
        <div
            class="grow 2xl:mr-3 2xl:w-1/2 2xl:flex-row"
            :class="{
                'flex': isExtended || isTwoXLScreen,
                'flex-col': isExtended && !isTwoXLScreen,
                'mr-3': !isExtended && !isTwoXLScreen,
            }"
        >
            <div class="2xl:flex 2xl:grow 2xl:flex-row">
                <div class="relative 2xl:flex 2xl:grow 2xl:flex-col">
                    <BaseFormInputAutocompletion
                        v-model="filter.keyword"
                        class="ApplicantFilterKeywordInput h-[3rem] pl-[44px]"
                        :autocompletion="AUTOCOMPLETION_TYPES.KEYWORD"
                        :is-input-focused="isExtended"
                        :is-input-readonly="!isExtended"
                        :input-error-message="$v.keyword"
                        input-group="keyword"
                        :input-placeholder="t('input','keywordPlaceholder')"
                    />
                    <svg
                        viewBox="0 0 24 24"
                        class="absolute top-4 left-4"
                        width="24"
                        height="24"
                    >
                        <MagnifierIcon/>
                    </svg>
                </div>
            </div>
        </div>
        <div
            class="2xl:m-0 2xl:flex 2xl:w-1/2 2xl:flex-row"
            :class="{
                'mt-4': isExtended || isTwoXLScreen,
            }"
        >
            <div
                v-if="isTwoXLScreen || isExtended"
                class="flex w-full"
            >
                <div class="flex w-full flex-row">
                    <div class="mr-3 flex w-1/2 grow flex-col">
                        <BaseFormInputAutocompletion
                            v-model="filter.location.name"
                            class="h-[3rem]"
                            :input-error-message="$v.location"
                            :autocompletion="AUTOCOMPLETION_TYPES.LOCATION"
                            input-group="location"
                            :input-placeholder="t('input',
                                                  'locationPlaceholder')"
                        />
                    </div>
                    <div class="w-[8rem] shrink-0">
                        <ApplicantFilterNearbySearch
                            :location="filter.location"
                            unit="km"
                            group="location"
                            @update-filter="updateFilter"
                        />
                    </div>
                </div>
            </div>
            <div
                class="flex 2xl:mt-0"
                :class="{
                    'mt-4': isExtended || isTwoXLScreen,
                }"
            >
                <BaseButtonOnlyIcon
                    type="button"
                    class="FilterButton mr-3 h-9 2xl:ml-3"
                    icon-name="Filter"
                    secondary
                    width="24"
                    height="24"
                    data-testid="ApplicantSearchField filter button"
                    @button-click="$emit('filterButtonClick')"
                />
                <div
                    v-if="isTwoXLScreen || isExtended"
                    class="grow"
                >
                    <BaseButton
                        class="w-full"
                        size="full"
                        primary
                        data-testid="ExtendedSearchbar search button"
                        @click="search"
                    >
                        {{ t('button','search') }}
                    </BaseButton>
                </div>
            </div>
        </div>
    </form>
</template>
