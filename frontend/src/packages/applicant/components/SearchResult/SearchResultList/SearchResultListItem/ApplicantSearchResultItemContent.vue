<script setup lang="ts">
import {
    onMounted, ref, watch, type Ref,
} from 'vue';

import { useLang } from '../../../../../shared/composables/i18n';

const props = defineProps({
    currentJobTitle: {
        type: String,
        default: '',
    },
    workExperience: {
        type: Number,
        default: 0,
    },
    jobField: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    readyToMove: {
        type: Boolean,
        default: false,
    },
    objectiveJob: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
});

const { t, lang: globalLang } = useLang();

const workExperienceText: Ref<string> = ref('');
const standAloneUrl: Ref<string> = ref('');

function createWorkExperienceText(): void {
    const isInYears = props.workExperience >= 12;
    const valueToUse = isInYears ? Math.round(props.workExperience / 12) : props.workExperience;
    if (isInYears) {
        workExperienceText.value = `${valueToUse.toString()} ${valueToUse === 1
            ? t('label', 'year')
            : t('label', 'years')}`;
    } else {
        workExperienceText.value = `${valueToUse.toString()} ${valueToUse === 1
            ? t('label', 'month')
            : t('label', 'months')}`;
    }
}

watch(globalLang, () => {
    createWorkExperienceText();
});

onMounted(() => {
    createWorkExperienceText();
    standAloneUrl.value = `${document.baseURI}candidate/${props.id}`;
});

</script>
<template>
    <div
        class="ApplicantSearchResultItemContent mb-2 break-all text-h4 font-semiBold"
        data-testid="ApplicantSearchResultItemContent jobTitle"
    >
        <span class="text-gray-600 hover:text-blue-900">
            <a
                :href="standAloneUrl"
                target="_blank"
                @click="!$event.metaKey ? $event.preventDefault() : ''"
            >{{ currentJobTitle ? currentJobTitle : '-' }}
            </a>
        </span>
        <br>
    </div>
    <div class="text-gray-600">
        <div class="mb-3 truncate">
            <span>{{ workExperienceText }}</span>
            <span v-if="jobField !== ''">&nbsp;&#8226;&nbsp;</span>
            <span>{{ jobField }}</span>
        </div>
        <div class="truncate">
            <span>{{ location }}</span>
            <span v-if="readyToMove"><span v-if="!!location">,&nbsp;</span>{{ t('label', 'readyToMove') }}</span>
        </div>
        <div class="mt-2 truncate">
            <span>{{ t('label', 'objectiveJob') }}: </span><span>{{ objectiveJob ? objectiveJob : '-' }}</span>
        </div>
        <div class="mt-5 truncate text-small text-gray-400">
            <span>{{ t('label', 'lastActivity') }}: -</span>
        </div>
    </div>
</template>
