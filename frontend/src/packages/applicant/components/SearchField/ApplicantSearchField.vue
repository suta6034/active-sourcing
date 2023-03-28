<script setup lang="ts">
import {
    onMounted, ref, watch,
} from 'vue';

import { useLang } from '../../../shared/composables/i18n';
import * as ApplicantFilterService from '../../repositories/filter-repository';
import { allFiltersLabels } from '../../repositories/filter-repository';

import ApplicantSearchFieldModal from './ApplicantSearchFieldModal.vue';
import ApplicantSearchFieldHeader from './ApplicantSearchFieldHeader.vue';
import ApplicantSearchFieldForm from './ApplicantSearchFieldForm.vue';

const props = defineProps({
    isExtended: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['activateBackdrop', 'extendHeader']);

const {
    setLang,
    lang: globalLang,
} = useLang();

const extendSearchField = (value: boolean) => {
    emits('extendHeader', value);
};
watch(() => props.isExtended, () => {
    emits('activateBackdrop', props.isExtended);
});

const showModal = ref(false);

// Filter Labels
const getFilterLabels = async (lang:string) => {
    const result = await ApplicantFilterService.getAllFilterLabels(lang);

    return result.data;
};
onMounted(async () => {
    const langFromStorage = window.localStorage.getItem('locale');
    if (langFromStorage) {
        setLang(langFromStorage);
    }
    allFiltersLabels.value = await getFilterLabels(langFromStorage || 'de');
});
watch(globalLang, async () => {
    allFiltersLabels.value = await getFilterLabels(globalLang.value);
});
</script>
<template>
    <ApplicantSearchFieldModal
        :show-modal="showModal"
        @close="extendSearchField(false);"
        @show-change="showModal = $event"
    />
    <div
        class="ApplicantSearchField flex h-full w-full items-center justify-center bg-white"
    >
        <!-- Applicant searchbar -->
        <Transition
            mode="out-in"
            class="duration-300 ease-out"
            enter-from-class="-translate-y-[100px] opacity-0"
            leave-to-class="-translate-y-[100px] opacity-0"
        >
            <div
                class="flex h-auto w-full flex-col"
                :data-testid="'ApplicantSearchField'
                    + (isExtended ? ' Extended' : '')"
                @click="extendSearchField(true)"
            >
                <ApplicantSearchFieldHeader :is-extended="isExtended"/>
                <ApplicantSearchFieldForm
                    :is-extended="isExtended"
                    @filter-button-click="showModal = !showModal"
                    @extend-header="$emit('extendHeader', $event)"
                />
            </div>
        </Transition>
    </div>
</template>
