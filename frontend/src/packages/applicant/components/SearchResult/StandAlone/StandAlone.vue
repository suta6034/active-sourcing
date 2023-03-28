<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useApplicant } from '../../../../shared/composables/applicant';
import { useLang } from '../../../../shared/composables/i18n';
import { userInfo } from '../../../../shared/composables/user-info';
import {
    CATEGORIES,
    EVENTS,
    EVENTSPARAMETERS,
    tracking,
} from '../../../../../util/tracking/tracking';

import ProfileView from '../SearchResultDetail/Profile/ProfileView.vue';
import NoResultIcon from '../../../../shared/assets/icons/NoResultIcon.vue';
import BaseLoadingDots from '../../../../shared/components/base/BaseLoadingDots.vue';
import BaseCenteringContainer from '../../../../shared/components/base/BaseCenteringContainer.vue';
import BaseIllustration from '../../../../shared/components/base/BaseIllustration.vue';

const {
    standAloneApplicantId,
    getProfileData,
    applicantProfileData,
    profileLoading,
} = useApplicant();

const { t } = useLang();

onMounted(() => {
    getProfileData(standAloneApplicantId.value);
});

watch(() => applicantProfileData.value && userInfo.value, () => {
    tracking({
        event: EVENTS.applicantView,
        [EVENTSPARAMETERS.view_type]: CATEGORIES.view_type?.standalone,
        [EVENTSPARAMETERS.applicant_id]: applicantProfileData.value?.profileId,
        [EVENTSPARAMETERS.company_id]: userInfo.value?.company?.id,
    });
});

</script>
<template>
    <template v-if="profileLoading">
        <BaseCenteringContainer>
            <BaseLoadingDots/>
        </BaseCenteringContainer>
    </template>
    <template v-else>
        <div
            v-if="applicantProfileData"
            class="StandAlone max-w-full 2xl:mx-10"
        >
            <ProfileView :show-border="false"/>
        </div>
        <div
            v-else
            class="NoResult flex h-full w-full flex-col items-center justify-center"
        >
            <BaseIllustration
                :view-box="'0 0 1600 1000'"
                width="sm:w-1/2 w-3/4"
            >
                <NoResultIcon/>
            </BaseIllustration>
            <span class="px-7 text-center text-tiny font-semiBold xl:text-h4">
                {{ t('notification', 'profileNotFound') }}
            </span>
        </div>
    </template>
</template>
