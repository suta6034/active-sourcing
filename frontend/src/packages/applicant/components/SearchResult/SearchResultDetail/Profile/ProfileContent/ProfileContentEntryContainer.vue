<script setup lang="ts">
import {
    onMounted, onUnmounted, ref, type Ref,
} from 'vue';

import XListIcon from '../../../../../../shared/assets/icons/XListIcon.vue';

import { BaseFunctions } from '../../../../../../shared/components/base/BaseFunctions';
import BaseModal from '../../../../../../shared/components/base/BaseModal.vue';

defineProps({
    showInModal: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
});

const show: Ref<boolean> = ref(true);
const scrollContainer: Ref<null | HTMLElement> = ref(null);
const modalContainer: Ref<null | HTMLElement> = ref(null);
const showHeaderShadow: Ref<boolean> = ref(false);

const emit = defineEmits(['close']);

const headerShadow = (): void => {
    showHeaderShadow.value = !!(scrollContainer.value && scrollContainer.value.scrollTop > 0);
};

const close = (): void => {
    show.value = false;
    emit('close');
};

onMounted(() => {
    if (modalContainer.value) {
        setTimeout(() => {
            scrollContainer.value = BaseFunctions.getScrollContainer(modalContainer.value);
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', headerShadow);
            }
        }, 0);
    }
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', headerShadow);
    }
});
</script>
<template>
    <template v-if="showInModal">
        <BaseModal
            :show="show"
            :full-screen="true"
            :show-close-button="false"
            @close="$emit('close')"
        >
            <div
                ref="modalContainer"
                class="
                ProfileContentEntryContainerModal
                flex
                min-h-full
                flex-col
                bg-gray-50"
            >
                <div
                    class="
                    Header
                    sticky
                    top-0
                    z-10
                    mb-[1px]
                    h-[60px]
                    bg-white
                    px-6
                    pt-[18px]
                    text-lead
                    font-semiBold"
                    :class="{
                        'shadow-md': showHeaderShadow,
                    }"
                >
                    <span>
                        {{ title }}
                    </span>
                    <button
                        class="
                        CloseButton
                        absolute
                        right-6
                        top-[19px]
                        w-6"
                        @click="close"
                    >
                        <svg
                            viewBox="-4 -2 24 24"
                        >
                            <XListIcon/>
                        </svg>
                    </button>
                </div>
                <div class="flex-1 bg-white p-6">
                    <slot/>
                </div>
            </div>
        </BaseModal>
    </template>
    <template v-else>
        <slot/>
    </template>
</template>
