<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';

import BaseSlider from '../../../shared/components/base/BaseSlider.vue';
import BaseFormLabel from '../../../shared/components/base/BaseFormLabel.vue';

import type {
    FilterSliderValue,
} from '../../../shared/types/applicant/types';

const { t } = useLang();

const props = defineProps({
    targetValue: {
        type: Number as () => FilterSliderValue,
        default: 0,
    },
    label: {
        type: String,
        default: '',
    },
    group: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['updateFilter']);

const data = [
    {
        value: 0,
        label: t('label', 'any'),
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
];

const getModelValue = (value: FilterSliderValue): void => {
    emit('updateFilter', {
        group: props.group,
        id: value,
    });
};
</script>
<template>
    <div :class="`ApplicantFilterSlider-${label} my-6 h-full`">
        <div class="sliderContainer">
            <div class="sliderContainerLabel mb-5">
                <BaseFormLabel :text="t('label', `${label}`)"/>
            </div>
            <div class="sliderContainerBody pl-2">
                <BaseSlider
                    :model-value="targetValue"
                    :data="data"
                    data-label="label"
                    data-value="value"
                    @get-model-value="getModelValue"
                />
            </div>
        </div>
    </div>
</template>
