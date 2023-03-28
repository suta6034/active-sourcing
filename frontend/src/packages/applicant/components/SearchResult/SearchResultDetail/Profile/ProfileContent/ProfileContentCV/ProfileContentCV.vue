<script setup lang="ts">
import { useLang } from '../../../../../../../shared/composables/i18n';
import { useApplicant } from '../../../../../../../shared/composables/applicant';
import { ProfileHelpers } from '../ProfileHelpers';

import ProfileContentEntry from '../ProfileContentEntry.vue';
import ProfileContentCVLanguage from './ProfileContentCVLanguage.vue';
import ProfileContentCVObjective from './ProfileContentCVObjective.vue';
import ProfileContentCVSkills from './ProfileContentCVSkills.vue';
import ProfileContentTimeLine from '../ProfileContentTimeLine.vue';

defineProps({
    showAsDropdown: {
        type: Boolean,
        default: false,
    },
    showObjective: {
        type: Boolean,
        default: true,
    },
});

const {
    applicantProfileData,
} = useApplicant();

const { t } = useLang();

</script>
<template>
    <div
        v-if="!!applicantProfileData"
        data-testid="ProfileContentCV"
        class="mt-[2px] w-full grow bg-white"
        :class="{
            'lg:flex lg:gap-1 lg:bg-transparent': !showAsDropdown,
        }"
    >
        <div
            class="bg-white"
            :class="{
                'lg:w-1/2 lg:p-[45px]': !showAsDropdown,
            }"
        >
            <template v-if="applicantProfileData?.experiences?.length">
                <ProfileContentEntry
                    :show-as-dropdown="showAsDropdown"
                    :title="t('label', 'jobExperience')"
                    :content-entry-id="ProfileHelpers.contentEntries.JOBEXPERIENCE"
                >
                    <ProfileContentTimeLine
                        data-testid="ProfileContentCV Experiences"
                        :entries="ProfileHelpers.normalizeExperienceEntries(applicantProfileData.experiences)"
                    />
                </ProfileContentEntry>
            </template>
        </div>
        <div
            :class="{
                'lg:flex lg:w-1/2 lg:flex-col lg:gap-1': !showAsDropdown
            }"
        >
            <div
                class="bg-white"
                :class="{
                    'lg:p-[45px]': !showAsDropdown,
                }"
            >
                <template v-if="applicantProfileData?.objective && showObjective">
                    <ProfileContentEntry
                        :show-as-dropdown="showAsDropdown"
                        :title="t('label', 'desiredJob')"
                        :content-entry-id="ProfileHelpers.contentEntries.OBJECTIVE"
                    >
                        <ProfileContentCVObjective
                            :entries="applicantProfileData.objective"
                            data-testid="ProfileContentCV Objective"
                        />
                    </ProfileContentEntry>
                </template>
            </div>
            <div
                class="grow bg-white pt-0"
                :class="{
                    'lg:p-[45px]': !showAsDropdown,
                }"
            >
                <div
                    v-if="ProfileHelpers.skillsValid(applicantProfileData.skills)"
                    :class="{
                        'min-lg:mb-[24px]': !showAsDropdown,
                    }"
                >
                    <ProfileContentEntry
                        :show-as-dropdown="showAsDropdown"
                        :title="t('label', 'skills')"
                        :content-entry-id="ProfileHelpers.contentEntries.SKILLS"
                    >
                        <ProfileContentCVSkills
                            :entries="applicantProfileData?.skills || undefined"
                            data-testid="ProfileContentCV Skills"
                        />
                    </ProfileContentEntry>
                </div>
                <div
                    v-if="applicantProfileData?.languages.length"
                    :class="{
                        'lg:mb-[21px]': !showAsDropdown,
                    }"
                >
                    <ProfileContentEntry
                        :show-as-dropdown="showAsDropdown"
                        :title="t('label', 'languages')"
                        :content-entry-id="ProfileHelpers.contentEntries.LANGUAGE"
                    >
                        <ProfileContentCVLanguage
                            :entries="applicantProfileData.languages"
                            data-testid="ProfileContentCV Languages"
                        />
                    </ProfileContentEntry>
                </div>
                <div v-if="applicantProfileData?.educations.length">
                    <ProfileContentEntry
                        :show-as-dropdown="showAsDropdown"
                        :title="t('label', 'education')"
                        :content-entry-id="ProfileHelpers.contentEntries.EDUCATION"
                    >
                        <ProfileContentTimeLine
                            :entries="applicantProfileData?.educations"
                            data-testid="ProfileContentCV Education"
                        />
                    </ProfileContentEntry>
                </div>
            </div>
        </div>
    </div>
</template>
