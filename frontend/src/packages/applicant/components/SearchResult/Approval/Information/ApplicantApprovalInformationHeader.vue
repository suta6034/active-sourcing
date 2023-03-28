<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import { useLang } from '../../../../../shared/composables/i18n';
import BaseAvatar from '../../../../../shared/components/base/BaseAvatar.vue';

import type { PreferredWorkplaces } from '../../../../../shared/types/applicant/types';
import ProfileWorkplaces from '../../SearchResultDetail/Profile/ProfileWorkplaces.vue';
import type { ProfileData } from '../../../../../shared/types/profile/types';
import ProfileEmploymentType from '../../SearchResultDetail/Profile/ProfileEmploymentType.vue';
import ProfileSalary from '../../SearchResultDetail/Profile/ProfileSalary.vue';

const { t } = useLang();

const props = defineProps({
    profileId: {
        type: String,
        default: '',
    },
    profileData: {
        type: Object as () => ProfileData,
        default: null,
    },
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
});

const currentJobTitle: Ref<string> = ref('');

onMounted(() => {
    if (props.profileData?.experiences?.length) {
        currentJobTitle.value = props.profileData.experiences[0].attributes.title;
    }
});

</script>
<template>
    <div
        class="bg-white p-6 pb-5"
        data-testid="ApplicantApprovalInformationHeader"
    >
        <BaseAvatar
            :width="100"
            :height="100"
        />
        <div class="mt-5">
            <span
                class="inline-block max-w-full truncate text-lead font-semiBold text-blue-900"
                data-testid="ApplicantApprovalInformationHeader JobTitle"
            >
                {{ currentJobTitle }}
            </span>
            <br>
            <span
                class="text-gray-600"
                data-testid="ApplicantApprovalInformationHeader ProfileID"
            >{{ t('table', 'profileId') }}: {{ profileId }}</span>
            <div class="mt-6 text-gray-600">
                <ProfileWorkplaces
                    :profile-data="profileData"
                    :locations="locations"
                    :show-ready-to-move="false"
                />
                <ProfileEmploymentType
                    class="pt-3"
                    :employment-type-ids="profileData?.objective?.employmentTypeIds"
                />
                <ProfileSalary
                    class="pt-3"
                    :salary="profileData?.objective?.salary || undefined"
                    :show-label="true"
                />
            </div>
        </div>
    </div>
</template>
