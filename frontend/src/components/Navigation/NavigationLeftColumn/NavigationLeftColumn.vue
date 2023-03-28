<script setup lang="ts">
import { userInfo } from '../../../packages/shared/composables/user-info';
import {
    DATA_GTM_ELEMENT,
    DATA_GTM_ELEMENT_DETAIL,
    TRACKINGPREFIX,
} from '../../../util/tracking/tracking';

import BaseInitials from '../../../packages/shared/components/base/BaseInitials.vue';
import SearchCandidateIcon from '../../../packages/shared/assets/icons/SearchCandidateIcon.vue';
import NavigationLeftColumnLogout from './NavigationLeftColumnLogout.vue';

defineEmits(['toggleNavMenu']);
</script>
<template>
    <div class="NavLeftColumn relative flex w-[80px] flex-col">
        <button
            class="
                NavSearchCandidateIcon
                absolute
                top-[169px]
                flex
                h-[70px]
                w-full
                items-center
                justify-center
                bg-gray-500"
        >
            <svg
                class="text-white"
                viewbox="0 0 24 24"
                width="24"
                height="24"
            >
                <SearchCandidateIcon/>
            </svg>
            <span
                class="
                    absolute
                    right-0
                    border-[12px]
                    border-y-transparent
                    border-l-transparent
                    border-r-white"
            />
        </button>
        <div class="mx-5 mt-auto mb-[18px]">
            <div class="flex w-full flex-col">
                <NavigationLeftColumnLogout/>
            </div>
            <div
                :data-gtm-element="`${TRACKINGPREFIX}: ${DATA_GTM_ELEMENT.navigation}`"
                :data-gtm-element-detail="DATA_GTM_ELEMENT_DETAIL.userDetails"
            >
                <BaseInitials
                    :initials="userInfo?.initials || undefined"
                    :img="userInfo?.profilePictureUrl || undefined"
                    :small="true"
                    :clickable="true"
                    @initials-click="$emit('toggleNavMenu')"
                />
            </div>
        </div>
    </div>
</template>
