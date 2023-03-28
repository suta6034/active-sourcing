<script setup lang="ts">
import BaseTextWithIcon from '../../../../../../../shared/components/base/BaseTextWithIcon.vue';
import type { ProfileObjective } from '../../../../../../../shared/types/profile/types';
import { BREAKPOINTS, useBreakpoint } from '../../../../../../../shared/composables/breakpoint';
import ProfileEmploymentType from '../../ProfileEmploymentType.vue';
import ProfileSalary from '../../ProfileSalary.vue';

const props = defineProps({
    entries: {
        type: Object as () => ProfileObjective | null,
        default: null,
    },
});

const isLgScreen = useBreakpoint(BREAKPOINTS.lg);

</script>
<template>
    <div
        v-if="entries"
        data-testid="ProfileObjective"
    >
        <BaseTextWithIcon
            class="ObjectiveJobs text-gray-600 max-lg:pb-4"
            icon-name="BriefcaseHeart"
            :clamped="isLgScreen"
            :element="props.entries?.jobs.join(', ')"
        />
        <ProfileEmploymentType
            class="max-lg:pb-4"
            :employment-type-ids="entries?.employmentTypeIds || null"
        />
        <ProfileSalary :salary="entries?.salary"/>
    </div>
</template>
