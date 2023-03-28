<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import { useLang } from '../../../../../shared/composables/i18n';

import MapIcon from '../../../../../shared/assets/icons/MapIcon.vue';
import BaseFixedContainer from '../../../../../shared/components/base/BaseFixedContainer.vue';

import type { PreferredWorkplaces } from '../../../../../shared/types/applicant/types';
import type { ProfileData } from '../../../../../shared/types/profile/types';

const props = defineProps({
    profileData: {
        type: Object as () => ProfileData | null,
        default: null,
    },
    showIcon: {
        type: Boolean,
        default: true,
    },
    locations: {
        type: Object as () => PreferredWorkplaces,
        default: undefined,
    },
    showReadyToMove: {
        type: Boolean,
        default: true,
    },
});

const { t } = useLang();

const showMorePreferredWorkplaces: Ref<boolean> = ref(false);
const preferredWorkplaces: Ref<null | HTMLElement> = ref(null);
const workplacesContainer: Ref<null | HTMLElement> = ref(null);
const morePreferredWorkplaces: Ref<Array<string>> = ref([]);

const createMorePreferredWorkplaces = () => {
    morePreferredWorkplaces.value = [];
    if (props.locations) {
        for (const location of props.locations) {
            const locationLabel = location?.label?.toString();
            if (locationLabel) {
                morePreferredWorkplaces.value.push(locationLabel);
            }
        }
    } else if (props.profileData) {
        morePreferredWorkplaces.value = Array.from(props.profileData.preferredWorkplaces);
    }
    morePreferredWorkplaces.value.shift();
};

const getFirstLocation = (): string => {
    if (props.locations) {
        return props.locations[0].label?.toString() || '';
    }
    return props.profileData?.preferredWorkplaces[0] || '';
};

onClickOutside(workplacesContainer, () => {
    showMorePreferredWorkplaces.value = false;
});

onMounted(() => {
    createMorePreferredWorkplaces();
});

</script>
<template>
    <div
        v-if="getFirstLocation()"
        data-testid="ProfileWorkplaces"
        class="PreferredWorkplaces flex flex-wrap"
        :class="{
            'mr-2' : !profileData?.readyToMove
        }"
    >
        <div
            v-if="showIcon"
            class="pr-3"
            data-testid="ProfileWorkplaces MapIcon"
        >
            <svg
                width="24"
                height="24"
            >
                <MapIcon/>
            </svg>
        </div>
        <BaseFixedContainer
            v-if="showMorePreferredWorkplaces"
            :ref-element="preferredWorkplaces"
            :full-border="true"
            :fit-content="true"
            :offset-right="12"
            :data-testid="'ProfileMorePreferredWorkplacesBox'"
            :max-height="240"
            @outside-scroll-or-resize="() => showMorePreferredWorkplaces = false"
        >
            <div
                v-for="preferredWorkplace in morePreferredWorkplaces"
                :key="preferredWorkplace"
                ref="workplacesContainer"
            >
                <div class="rounded-b bg-white p-4">
                    {{ preferredWorkplace }}
                </div>
            </div>
        </BaseFixedContainer>
        <div
            ref="preferredWorkplaces"
            data-testid="ProfileWorkplaces FirstLocation"
        >
            <span>{{ getFirstLocation() }}</span>
            <span v-if="morePreferredWorkplaces.length !== 0">
                <span>,</span>
                <span
                    :data-testid="'ProfileMorePreferredWorkplaces'"
                    class="ml-2 cursor-pointer underline"
                    @click="showMorePreferredWorkplaces = !showMorePreferredWorkplaces"
                >
                    +{{ morePreferredWorkplaces.length }} {{ t('label', 'showMore') }}</span>
            </span>
        </div>
        <span
            v-if="profileData?.readyToMove && showReadyToMove"
            data-testid="ProfileWorkplaces ReadyToMove"
            class="ReadyToMove"
        >
            &nbsp;·&nbsp;{{ t('label', 'readyToMove') }}
        </span>
    </div>
</template>
