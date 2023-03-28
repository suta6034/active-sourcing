<script setup lang="ts">
import {
    onMounted, ref, type Ref, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useApplicant } from '../../../shared/composables/applicant';
import { BREAKPOINTS, useBreakpoint } from '../../../shared/composables/breakpoint';
import { userInfo } from '../../../shared/composables/user-info';
import { useLang } from '../../../shared/composables/i18n';
import {
    CATEGORIES, EVENTS, EVENTSPARAMETERS, tracking,
} from '../../../../util/tracking/tracking';

import ApplicantApprovalMessage from './Approval/ApplicantApprovalMessage.vue';
import ApplicantApprovalInformation from './Approval/Information/ApplicantApprovalInformation.vue';
import ApplicantSearchList from './SearchResultList/ApplicantSearchList.vue';
import ApplicantSearchResultDetail from './SearchResultDetail/ApplicantSearchResultDetail.vue';
import BaseSplitView from '../../../shared/components/base/BaseSplitView.vue';
import StandAlone from './StandAlone/StandAlone.vue';

import type { PreferredWorkplaces } from '../../../shared/types/applicant/types';

const {
    applicants,
    applicantApprovalId,
    getProfileData,
    selectedApplicantId,
    standAloneApplicantId,
} = useApplicant();

const {
    lang: globalLang,
} = useLang();

const router = useRouter();
const route = useRoute();

const isSMScreen = useBreakpoint(BREAKPOINTS.sm);
const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);
const selectedApplicantWorkplaces: Ref<PreferredWorkplaces | null> = ref(null);

const setPath = (): void => {
    if (!standAloneApplicantId.value) {
        if (isTwoXLScreen.value) {
            router.replace({ path: '/', query: { selectedProfile: undefined } });
        } else {
            router.replace({ path: '/', query: { selectedProfile: selectedApplicantId.value || undefined } });
        }
    }
};

const onSelectListItem = (selectedApplicantData: Record<string, string | PreferredWorkplaces>): void => {
    tracking({
        event: EVENTS.applicantView,
        [EVENTSPARAMETERS.view_type]: CATEGORIES.view_type?.candidateSearch,
        [EVENTSPARAMETERS.applicant_id]: selectedApplicantData?.id,
        [EVENTSPARAMETERS.company_id]: userInfo.value?.company?.id,
    });

    if (selectedApplicantId.value !== selectedApplicantData.id) {
        getProfileData(selectedApplicantData.id as string);
    }
    selectedApplicantId.value = selectedApplicantData.id as string;
    setPath();
    selectedApplicantWorkplaces.value = selectedApplicantData.preferredWorkplaces as PreferredWorkplaces;
};

onMounted(() => {
    if (route.params.profileId) {
        standAloneApplicantId.value = route.params.profileId as string;
    } else if (route.query.selectedProfile) {
        standAloneApplicantId.value = route.query.selectedProfile as string;
        router.replace(`/candidate/${standAloneApplicantId.value}`);
    }
});

watch(globalLang, async () => {
    if (selectedApplicantId.value) {
        await getProfileData(selectedApplicantId.value);
    }
});
watch(() => isTwoXLScreen.value, () => {
    setPath();
});

</script>

<template>
    <BaseSplitView
        v-if="applicants?.meta || applicantApprovalId"
        class="ApplicantPage"
        data-testid="ApplicantPage"
        :class="{
            'justify-center': !isTwoXLScreen && !applicantApprovalId
        }"
    >
        <template #left>
            <ApplicantSearchList
                v-show="applicants?.meta && !applicantApprovalId &&
                    (isTwoXLScreen || !isTwoXLScreen && !selectedApplicantId)"
                :applicants="applicants"
                @on-select-list-item="onSelectListItem"
            />
            <ApplicantApprovalInformation
                v-if="applicantApprovalId && isSMScreen"
                :locations="selectedApplicantWorkplaces || undefined"
            />
        </template>
        <template #right>
            <ApplicantSearchResultDetail
                v-if="applicants?.meta && !applicantApprovalId && (isTwoXLScreen || selectedApplicantId)"
                :no-applicants-list="applicants.data.length === 0"
                :locations="selectedApplicantWorkplaces || undefined"
                @back-to-search="setPath"
            />
            <ApplicantApprovalMessage
                v-if="applicantApprovalId"
            />
        </template>
    </BaseSplitView>
    <div
        v-else-if="standAloneApplicantId && !applicantApprovalId"
        class="StandAlonePage flex h-full w-full justify-center overflow-auto bg-gray-50 pt-7"
        data-testid="StandAlonePage"
    >
        <StandAlone/>
    </div>
</template>
