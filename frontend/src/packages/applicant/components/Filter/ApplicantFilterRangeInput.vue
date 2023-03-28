<script setup lang="ts">
import {
    computed, onMounted, ref, watchEffect, type Ref,
} from 'vue';

import { helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useLang } from '../../../shared/composables/i18n';

import BaseNumericInput from '../../../shared/components/base/BaseNumericInput.vue';
import BaseErrorMessage from '../../../shared/components/base/BaseErrorMessage.vue';
import BaseFormLabel from '../../../shared/components/base/BaseFormLabel.vue';
import type { Range } from '@/packages/shared/types/applicant/types';

const props = defineProps({
    from: {
        type: Number,
        default: undefined,
    },
    to: {
        type: Number,
        default: undefined,
    },
    group: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    placeholderFrom: {
        type: String,
        default: '',
    },
    placeholderTo: {
        type: String,
        default: '',
    },
    unit: {
        type: Boolean,
        default: null,
    },
    max: {
        type: Number,
        default: null,
    },
    allowOnlyInteger: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['rangeChange', 'updateFilter', 'isValid']);

const { t } = useLang();

const range: Ref<Range> = ref({ from: undefined, to: undefined });

watchEffect(() => {
    range.value.from = props.from;
    range.value.to = props.to;
});

const validationCheck = () => !(range.value.from != null
    && range.value.to != null
    && range.value.from >= range.value.to);

const rules = computed(() => ({
    to: {
        minValue: helpers.withMessage(() => `${t('validation', 'maxIsGreaterThanMin')}`, validationCheck),
    },
}));

const validation = useVuelidate(rules, range);

const checkRange = (
    value: number | undefined,
    isMinChange?: boolean,
): void => {
    range.value[isMinChange ? 'from' : 'to'] = value;

    emit('updateFilter', {
        group: props.group,
        key: isMinChange ? 'from' : 'to',
        id: value,
    });
    emit('isValid', validationCheck());
};

onMounted(() => {
    emit('isValid', validationCheck());
});
</script>
<template>
    <div>
        <BaseFormLabel :text="t('label', group)"/>
        <div class="flex gap-5">
            <div class="h-9 w-[8.75rem]">
                <BaseNumericInput
                    :class="`${group}-min`"
                    :test-id="group + ' min'"
                    :min="0"
                    :max="max ? max - 1 : undefined"
                    :unit="unit"
                    :error="!validationCheck()"
                    :is-disabled="disabled"
                    :value="range.from !== null ? range.from : undefined"
                    :placeholder="placeholderFrom"
                    :allow-only-integer="allowOnlyInteger"
                    @input-change="(val: number | undefined) => checkRange(val, true)"
                />
            </div>
            <div class="h-9 w-[8.75rem]">
                <BaseNumericInput
                    :class="`${group}-max`"
                    :test-id="group + ' max'"
                    :min="1"
                    :max="max"
                    :unit="unit"
                    :error="!validationCheck()"
                    :is-disabled="disabled"
                    :placeholder="placeholderTo"
                    :value="range.to !== null ? range.to : undefined"
                    :allow-only-integer="allowOnlyInteger"
                    @input-change="(val: number | undefined) => checkRange(val, false)"
                />
            </div>
        </div>
        <div v-if="!validationCheck()">
            <BaseErrorMessage
                class="ErrorMessage"
                :message="validation.to.minValue.$message"
            />
        </div>
    </div>
</template>
