<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import { useFilter } from '../../../../../../shared/composables/filter';
import BaseTimeLine from '../../../../../../shared/components/base/BaseTimeLine/BaseTimeLine.vue';
import { ProfileHelpers } from './ProfileHelpers';

import type { TimeLineEntry } from '../../../../../../shared/components/base/BaseTimeLine/types';
import type { QuickViewTimeLineEntry } from '../../../../../../shared/types/profile/types';

const props = defineProps({
    entries: {
        type: Object as () => Array<QuickViewTimeLineEntry>,
        default: null,
    },
    filterLabel: {
        type: String,
        default: null,
    },
});

const { getLabelForFilter } = useFilter();

const timeLineEntries: Ref<Array<TimeLineEntry>> = ref([]);

const getSubtitle = (entry:QuickViewTimeLineEntry) => {
    if (entry.experienceTypeId) {
        const experienceType = getLabelForFilter('experienceTypes', entry.experienceTypeId);
        const institution = entry.institution ? `, ${entry.institution}` : '';

        return `${experienceType}${institution}`;
    }
    if (entry.jobFieldId) {
        return getLabelForFilter(
            'jobFields',
            entry.jobFieldId,
        );
    }
    return entry.focus || entry.institute || entry.url || null;
};

const getDateHeading = (entry: QuickViewTimeLineEntry) => {
    if (entry.year) {
        return entry.year;
    }
    return ProfileHelpers.getDateHeading(
        entry.experienceMonths != null ? entry.experienceMonths : null,
        entry.start || '',
        entry.end,
    );
};
onMounted(() => {
    if (props.entries) {
        for (const entry of props.entries) {
            timeLineEntries.value.push({
                id: entry.id,
                title: entry.title || null,
                dateHeading: getDateHeading(entry),
                subTitle: getSubtitle(entry),
                description: entry.description || null,
            });
        }
    }
});
</script>
<template>
    <BaseTimeLine :entries="timeLineEntries"/>
</template>
