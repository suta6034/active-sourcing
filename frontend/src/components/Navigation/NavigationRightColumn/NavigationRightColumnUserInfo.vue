<script setup lang="ts">
import BaseInitials from '../../../packages/shared/components/base/BaseInitials.vue';

defineProps({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    initials: {
        type: String,
        default: '',
    },
    img: {
        type: String,
        default: '',
    },
    companyName: {
        type: String,
        default: '',
    },
    companyAddress: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <div class="break-words px-6">
        <BaseInitials
            :img="img"
            :initials="initials"
        />
        <div>
            <div class="mt-5 text-base font-semiBold tracking-[-0.1]">
                {{ firstName }} {{ lastName }}
            </div>
            <div class="font-regular text-small tracking-[-0.1px] text-gray-600">
                <div class="mt-1">
                    {{ companyName }}
                </div>
                <div class="mt-1">
                    {{ companyAddress }}
                </div>
            </div>
        </div>
    </div>
</template>
