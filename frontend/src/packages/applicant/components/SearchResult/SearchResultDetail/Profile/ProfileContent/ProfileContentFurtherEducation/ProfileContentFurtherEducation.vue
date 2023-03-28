<script setup lang="ts">
import { useLang } from '../../../../../../../shared/composables/i18n';
import { useApplicant } from '../../../../../../../shared/composables/applicant';
import { ProfileHelpers } from '../ProfileHelpers';

import ProfileContentEntry from '../ProfileContentEntry.vue';
import ProfileContentTimeLine from '../ProfileContentTimeLine.vue';

import type {
    ProjectsAndAwardsEntry,
    QuickViewTimeLineEntry,
} from '../../../../../../../shared/types/profile/types';

const {
    applicantProfileData,
} = useApplicant();

const { t } = useLang();

const normalizeEntries = (targetArray:ProjectsAndAwardsEntry[]): QuickViewTimeLineEntry[] => {
    const flatEntries:Array<QuickViewTimeLineEntry> = [];

    targetArray.forEach((obj: ProjectsAndAwardsEntry) => {
        const flatObj = {
            type: obj.type || null,
            ...obj.attributes,
        };
        flatEntries.push(flatObj);
    });

    return flatEntries;
};
</script>
<template>
    <div
        v-if="!!applicantProfileData"
        class="mt-[2px] w-full grow bg-white lg:flex lg:gap-1 lg:bg-transparent"
    >
        <div class="bg-white lg:w-1/2 lg:p-[45px]">
            <ProfileContentEntry
                :title="t('label', 'furtherEducation')"
                :content-entry-id="ProfileHelpers.contentEntries.FURTHEREDUCATIONS"
            >
                <ProfileContentTimeLine
                    v-if="applicantProfileData?.furtherEducations?.length"
                    :entries="applicantProfileData.furtherEducations"
                />
                <span v-else>
                    {{ t('input', 'notSpecified') }}
                </span>
            </ProfileContentEntry>
        </div>
        <div class="lg:flex lg:w-1/2 lg:flex-col lg:gap-1">
            <div class="grow bg-white pt-0 lg:p-[45px]">
                <div>
                    <ProfileContentEntry
                        :title="t('label', 'projectsAndAwards')"
                        :content-entry-id="ProfileHelpers.contentEntries.PROJECTSANDAWARDS"
                    >
                        <ProfileContentTimeLine
                            v-if="applicantProfileData?.projectsAndAwards.length"
                            :entries="normalizeEntries(applicantProfileData?.projectsAndAwards)"
                        />
                        <span v-else>
                            {{ t('input', 'notSpecified') }}
                        </span>
                    </ProfileContentEntry>
                </div>
            </div>
        </div>
    </div>
</template>
