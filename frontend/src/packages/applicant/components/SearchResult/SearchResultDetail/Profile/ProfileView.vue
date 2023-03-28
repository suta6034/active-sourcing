<script setup lang="ts">
import {
    onMounted, ref, type Ref, watch,
} from 'vue';

import { useApplicant } from '../../../../../shared/composables/applicant';
import { useLang } from '../../../../../shared/composables/i18n';

import BaseTabList from '../../../../../shared/components/base/BaseTabList.vue';
import BaseLoadingDots from '../../../../../shared/components/base/BaseLoadingDots.vue';
import ProfileContentCV from './ProfileContent/ProfileContentCV/ProfileContentCV.vue';
import ProfileContentFurtherEducation from
    './ProfileContent/ProfileContentFurtherEducation/ProfileContentFurtherEducation.vue';
import ProfileContentPersonality from './ProfileContent/ProfileContentPersonality/ProfileContentPersonality.vue';
import ProfileTitleHeader from './ProfileTitleHeader.vue';

import type { Tab } from '../../../../../shared/types/base/types';
import type { PreferredWorkplaces } from '@/packages/shared/types/applicant/types';

defineProps({
    showBorder: {
        type: Boolean,
        default: true,
    },
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
});

const {
    applicantProfileData,
    profileLoading,
} = useApplicant();

const { t, lang: globalLang } = useLang();

const tabs: Ref<Array<Tab>> = ref([]);

const TAB_IDS = {
    RESUME: 1,
    FURTHER_EDUCATION: 2,
    PERSONALITY: 3,
    ATTACHMENT: 4,
};

const setTabs = () => {
    tabs.value = [
        {
            label: t('label', 'resume'),
            id: TAB_IDS.RESUME,
            active: true,
        },
        {
            label: t('label', 'furtherEducation'),
            id: TAB_IDS.FURTHER_EDUCATION,
            active: false,
        },
        {
            label: t('label', 'personality'),
            id: TAB_IDS.PERSONALITY,
            active: false,
        },
        {
            label: t('label', 'attachment'),
            id: TAB_IDS.ATTACHMENT,
            disabled: true,
        },
    ];
};

const activatedTab = ref(1);
const selectTab = (selectedTab: number) => {
    activatedTab.value = selectedTab;
};

watch(globalLang, setTabs);

onMounted(() => {
    setTabs();
});

</script>

<template v-if="applicantProfileData">
    <div class="ProfileView max-lg:flex max-lg:h-full max-lg:flex-col">
        <template v-if="profileLoading">
            <BaseLoadingDots
                class="absolute top-[45vh] left-[55vw]"
            />
        </template>
        <template v-else>
            <ProfileTitleHeader
                :applicant-profile-data="applicantProfileData"
                :show-border="showBorder"
                :locations="locations"
            />
            <div class="mt-1">
                <BaseTabList
                    :tabs="tabs"
                    @select-tab="selectTab"
                />
            </div>
            <ProfileContentCV v-if="activatedTab === TAB_IDS.RESUME"/>
            <ProfileContentFurtherEducation v-if="activatedTab === TAB_IDS.FURTHER_EDUCATION"/>
            <template v-if="activatedTab === TAB_IDS.PERSONALITY">
                <div
                    v-if="!!applicantProfileData?.statement"
                    class="ProfileViewStatement my-1 break-words bg-white px-7 py-6 text-center text-gray-600"
                >
                    {{ applicantProfileData.statement }}
                </div>
                <ProfileContentPersonality
                    :about-me="applicantProfileData?.aboutMe"
                    :interests="applicantProfileData?.interests"
                />
            </template>
        </template>
    </div>
</template>
