<script setup lang="ts">
import {
    ref, watchEffect,
} from 'vue';

import * as ApplicantFilterService from '../../repositories/filter-repository';

import ArrowUpIcon from '../../../shared/assets/icons/ArrowUpIcon.vue';
import ArrowDownIcon from '../../../shared/assets/icons/ArrowDownIcon.vue';

import type {
    Location,
} from '../../../shared/types/applicant/types';

const props = defineProps({
    value: {
        type: Number as () => number | null,
        default: null,
    },
    unit: {
        type: String,
        default: '',
    },
    location: {
        type: Object as () => Location,
        default: null,
    },
    group: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['updateFilter']);

const isValidLocation = ref(false);

const checkValid = (radius: number) => {
    if (!isValidLocation.value) return;

    let validRadius = radius;
    if (radius < 0) validRadius = 0;
    if (radius > 50) validRadius = 50;

    emit('updateFilter', {
        group: props.group,
        key: 'radius',
        id: validRadius,
    });
};

const buttonKeydown = (event: KeyboardEvent, increase?: boolean): void => {
    if (event.key === ' ' || event.key === 'Enter') {
        const step = increase ? 10 : -10;
        checkValid(props.location.radius ? props.location.radius + step : step);
    }
};

watchEffect(async () => {
    if (props.location.name !== null) {
        const response = await ApplicantFilterService.validateLocation(props.location.name);

        // when not valid, reset radius.
        if ((response.data as {
            valid: boolean,
        }).valid === false) {
            emit('updateFilter', {
                group: props.group,
                key: 'radius',
                id: 0,
            });
        }
        isValidLocation.value = (response.data as {
            valid: boolean,
        }).valid;
    }
});
</script>
<template>
    <label
        class="
            flex
            h-9
            w-full
            items-center
            justify-between
            rounded-md
            border
            border-gray-300
            bg-gray-50
            px-4
            focus-within:border-blue-900
            "
        :class="{'cursor-not-allowed focus-within:border-gray-300': !isValidLocation}"
        data-testid="ApplicantFilterNearbySearch"
    >
        <div
            class="mr-4 flex h-3/4 w-[1.25rem] shrink-0 flex-col items-center"
        >
            <svg
                class="cursor-pointer text-gray-700"
                :class="{
                    'cursor-not-allowed text-gray-300 focus:outline-none': !isValidLocation,
                }"
                viewBox="0 0 16 16"
                role="icon"
                data-testid="ApplicantFilterNearbySearch increase radius button"
                :tabindex="isValidLocation ? 0 : -1"
                @keydown="isValidLocation ? buttonKeydown($event, true) : undefined"
                @click="checkValid(location.radius ? location.radius + 10 : 10)"
            >
                <ArrowUpIcon/>
            </svg>
            <svg
                class="cursor-pointer text-gray-700"
                :class="{
                    'cursor-not-allowed text-gray-300 focus:outline-none': !isValidLocation,
                }"
                viewBox="0 0 16 16"
                role="icon"
                data-testid="ApplicantFilterNearbySearch decrease radius button"
                :tabindex="isValidLocation ? 0 : -1"
                @keydown="isValidLocation ? buttonKeydown($event, false) : undefined"
                @click="checkValid(location.radius ? location.radius - 10 : -10)"
            >
                <ArrowDownIcon/>
            </svg>
        </div>
        <div class="flex grow">
            <input
                class="w-full cursor-default bg-gray-50 text-end text-base text-gray-600
                focus:shadow-none focus:outline-none disabled:text-gray-300"
                type="text"
                :disabled="!isValidLocation"
                :value="`+${location.radius}`"
                readonly
                data-testid="ApplicantFilterNearbySearch radius input"
                tabindex="-1"
            >
            <span
                class="ml-[1.25rem] select-none text-base text-gray-600"
                :class="{'text-gray-300': !isValidLocation}"
            >
                {{ unit }}
            </span>
        </div>
    </label>
</template>
