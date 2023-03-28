<script setup lang="ts">
import {
    onMounted, ref, watchEffect, type Ref,
} from 'vue';

import { useLang } from '../../../../../shared/composables/i18n';
import { useApplicant } from '../../../../../shared/composables/applicant';

import BaseBackNavigation from '../../../../../shared/components/base/BaseBackNavigation.vue';

import ApplicantApprovalInformationHeader from './ApplicantApprovalInformationHeader.vue';
import type { ProfileData } from '../../../../../shared/types/profile/types';
import type { PreferredWorkplaces } from '../../../../../shared/types/applicant/types';
import ProfileContentCV
    from '../../SearchResultDetail/Profile/ProfileContent/ProfileContentCV/ProfileContentCV.vue';

defineProps({
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
});

const { t } = useLang();

const {
    applicantApprovalId,
    applicantProfileData,
} = useApplicant();

const backToSearch = () => {
    applicantApprovalId.value = '';
};

const profileData: Ref<ProfileData | null> = ref(null);
const contentContainer: Ref<HTMLElement | null> = ref(null);
const contentIsScrolled: Ref<boolean> = ref(false);

watchEffect(() => {
    if (applicantApprovalId.value) {
        profileData.value = applicantProfileData.value;
    } else {
        profileData.value = null;
    }
});

onMounted(() => {
    if (contentContainer.value) {
        contentContainer.value.addEventListener('scroll', () => {
            contentIsScrolled.value = contentContainer.value ? contentContainer.value.scrollTop > 0 : false;
        });
    }
});

</script>
<template>
    <div
        v-if="profileData"
        class="ApplicantApprovalInformation flex w-1/3 flex-col max-4xl:w-[26rem]"
        data-testid="ApplicantApprovalInformation"
    >
        <BaseBackNavigation
            :text="t('button', 'back')"
            :shadow="contentIsScrolled"
            @back-navigation="backToSearch"
        />
        <div
            ref="contentContainer"
            data-testid="ApplicantApprovalInformation ContentContainer"
            class="flex h-full flex-col overflow-auto"
        >
            <ApplicantApprovalInformationHeader
                :profile-data="profileData"
                :profile-id="applicantApprovalId"
                :locations="locations"
            />
            <ProfileContentCV
                class="mt-1 grow"
                :show-as-dropdown="true"
                :show-objective="false"
            />
        </div>
    </div>
</template>
