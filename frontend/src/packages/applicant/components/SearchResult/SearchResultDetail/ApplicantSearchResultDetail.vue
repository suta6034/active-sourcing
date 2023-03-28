<script setup lang="ts">
import {
    ref, onMounted, onUnmounted, type Ref,
} from 'vue';

import { ProfileHelpers } from './Profile/ProfileContent/ProfileHelpers';
import { useLang } from '../../../../shared/composables/i18n';
import { useApplicant } from '../../../../shared/composables/applicant';
import { BREAKPOINTS, useBreakpoint } from '../../../../shared/composables/breakpoint';

import BaseBackNavigation from '../../../../shared/components/base/BaseBackNavigation.vue';
import BaseLoadingDots from '../../../../shared/components/base/BaseLoadingDots.vue';
import BaseIllustration from '../../../../shared/components/base/BaseIllustration.vue';
import EmptyStateIcon from '../../../../shared/assets/icons/EmptyStateIcon.vue';
import NoResultIcon from '../../../../shared/assets/icons/NoResultIcon.vue';
import ProfileView from './Profile/ProfileView.vue';

import type { PreferredWorkplaces } from '../../../../shared/types/applicant/types';

defineProps({
    noApplicantsList: {
        type: Boolean,
        default: true,
    },
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
});

const emit = defineEmits(['backToSearch']);

const isTwoXLScreen = useBreakpoint(BREAKPOINTS['2xl']);
const { t } = useLang();
const {
    profileLoading,
    selectedApplicantId,
} = useApplicant();

const backToSearch = () => {
    selectedApplicantId.value = '';
    ProfileHelpers.shownContentEntry.value = null;
    emit('backToSearch');
};

const scrollContainer:Ref<HTMLElement | null> = ref(null);
const isScrolled:Ref<boolean | null> = ref(false);

const scrollHandler = () => {
    isScrolled.value = scrollContainer.value && scrollContainer.value.scrollTop > 0;
};
onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', scrollHandler);
    }
});
onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', scrollHandler);
    }
});

</script>

<template>
    <div class="ApplicantSearchResultDetail flex w-full flex-col">
        <BaseBackNavigation
            v-if="!isTwoXLScreen"
            class="ApplicantSearchResultDetail Navigation"
            data-testid="ApplicantSearchResultDetail Navigation"
            :shadow="isScrolled"
            :text="t('button', 'backToSearch')"
            @back-navigation="backToSearch"
        />
        <div
            ref="scrollContainer"
            class="ApplicantSearchResultDetailScrollContainer flex grow overflow-auto rounded-sm 2xl:ml-7"
            :class="{
                'justify-center items-center': profileLoading,
            }"
            data-testid="ApplicantSearchResultDetail"
        >
            <template v-if="profileLoading">
                <BaseLoadingDots/>
            </template>
            <div
                v-else
                class="flex w-full flex-col"
                :class="{
                    'justify-center items-center h-full bg-white': noApplicantsList || !selectedApplicantId,
                }"
            >
                <template v-if="noApplicantsList">
                    <BaseIllustration
                        :data-testid="'ApplicantSearchResultDetail noResult'"
                        :view-box="'0 0 1600 1200'"
                        width="w-2/3"
                    >
                        <NoResultIcon/>
                    </BaseIllustration>
                </template>
                <template v-else>
                    <template v-if="selectedApplicantId">
                        <ProfileView :locations="locations"/>
                    </template>
                    <template v-else>
                        <BaseIllustration
                            :data-testid="'ApplicantSearchResultDetail emptyState'"
                            :view-box="'0 0 1173.35 950.34'"
                            width="w-1/2"
                        >
                            <EmptyStateIcon/>
                        </BaseIllustration>
                        <span class="text-small font-semiBold 3xl:text-h4">
                            {{ t('validation','emptyStateView') }}
                        </span>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
