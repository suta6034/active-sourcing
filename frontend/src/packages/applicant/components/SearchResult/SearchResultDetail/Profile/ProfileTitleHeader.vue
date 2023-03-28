<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLang } from '../../../../../shared/composables/i18n';
import { BREAKPOINTS, useBreakpoint } from '../../../../../shared/composables/breakpoint';
import { useFilter } from '../../../../../shared/composables/filter';

import BaseAvatar from '../../../../../shared/components/base/BaseAvatar.vue';
import BaseButton from '../../../../../shared/components/base/BaseButton.vue';
import CalenderIcon from '../../../../../shared/assets/icons/CalenderIcon.vue';

import type { PreferredWorkplaces } from '../../../../../shared/types/applicant/types';
import type { ProfileData } from '../../../../../shared/types/profile/types';
import { useApplicant } from '../../../../../shared/composables/applicant';
import ProfileWorkplaces from './ProfileWorkplaces.vue';

const props = defineProps({
    applicantProfileData: {
        type: Object as () => ProfileData | null,
        default: null,
    },
    showBorder: {
        type: Boolean,
        default: true,
    },
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
});

const { t } = useLang();
const { getLabelForFilter } = useFilter();
const {
    selectedApplicantId,
    applicantApprovalId,
    standAloneApplicantId,
} = useApplicant();
const isMDScreen = useBreakpoint(BREAKPOINTS.md);
const isSMScreen = useBreakpoint(BREAKPOINTS.sm);

const preferredWorkplaces: Ref<null | HTMLElement> = ref(null);

const showMorePreferredWorkplaces = ref(false);

const currentJobTitle: Ref<string> = ref('');

const showApplicantApproval = () => {
    if (selectedApplicantId.value) {
        applicantApprovalId.value = selectedApplicantId.value;
    } else {
        applicantApprovalId.value = standAloneApplicantId.value;
    }
};

onMounted(() => {
    if (props.applicantProfileData) {
        currentJobTitle.value = (props.applicantProfileData.experiences?.length > 0
        && props.applicantProfileData.experiences[0].attributes.title)
        || '';
    }
});
onClickOutside(preferredWorkplaces, () => {
    showMorePreferredWorkplaces.value = false;
});

</script>
<template>
    <div
        :data-testid="'ProfileTitleHeader'"
        class="ProfileTitleHeader
        relative
        flex
        rounded-t-[3px]
        bg-white
        p-6
        md:px-7
        "
        :class="{
            '2xl:border-l-[4px] 2xl:border-l-blue-900': showBorder,
        }"
    >
        <div
            class="ProfileTitleHeaderAvatar sm:mr-6"
            :class="{
                'mr-4' : !isSMScreen
            }"
        >
            <BaseAvatar
                :width="isSMScreen ? 100 : 40"
                :height="isSMScreen ? 100 : 40"
            />
        </div>
        <div class="ProfileTitleHeaderContent w-full">
            <div class="flex flex-col md:flex-row">
                <div class="mr-0 flex flex-col md:mr-4 md:w-2/3">
                    <div class="JobTitle flex">
                        <div
                            class="break-all text-lead font-semiBold 2xl:text-h3"
                            :data-testid="'ProfileTitleHeaderCurrentJobTitle'"
                        >
                            {{ currentJobTitle }}
                        </div>
                    </div>
                    <div class="ProfileId mt-2 text-small text-gray-600 md:text-base">
                        <span>{{ t('table', 'profileId') }}: {{ applicantProfileData?.profileId }}</span>
                    </div>
                    <div class="mt-2 flex flex-wrap text-small text-gray-600 md:mr-5 md:text-base">
                        <ProfileWorkplaces
                            :profile-data="applicantProfileData"
                            :show-icon="isMDScreen"
                            :locations="locations"
                            class="md:mr-5"
                        />
                        <div
                            class="Availability flex"
                        >
                            <svg
                                v-if="isMDScreen"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <CalenderIcon/>
                            </svg>
                            <span v-else>
                                &nbsp;·&nbsp;
                            </span>
                            <span class="md:ml-4">
                                {{ t('label', 'availability') }}:&nbsp;
                                {{ applicantProfileData ?
                                    getLabelForFilter('availability', applicantProfileData.availabilityId)
                                    : '' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="mt-1"
                    :class="{
                        'mt-4' : !isMDScreen
                    }"
                >
                    <span class="LastActivity text-small text-gray-300 md:text-base md:text-gray-500">
                        {{ t('label', 'lastActivity') }}: -
                    </span>
                </div>
            </div>
        </div>
        <BaseButton
            class="SendRequestButton absolute right-7 bottom-6 px-3 lg:w-[181px]"
            data-testid="SendRequestButton"
            secondary
            :size="!isMDScreen ? 's' : ''"
            @click="showApplicantApproval"
        >
            {{ t('button','sendRequest') }}
        </BaseButton>
    </div>
</template>
