<script setup lang="ts">
import {
    ref, watch, onMounted, onUnmounted, type Ref,
} from 'vue';
import { onClickOutside } from '@vueuse/core';

import { BREAKPOINTS, useBreakpoint } from '../../composables/breakpoint';
import * as Navigation from '../../navigation/Navigation';

import XListIcon from '../../assets/icons/XListIcon.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    fullScreen: {
        type: Boolean,
        default: false,
    },
    showCloseButton: {
        type: Boolean,
        default: true,
    },
    fullHeight: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close']);

const untilMDScreen = ref(useBreakpoint(BREAKPOINTS.md, 'max'));
const isFourXLScreen = ref(useBreakpoint(BREAKPOINTS['4xl']));

const showModal = ref(props.show);
const modal = ref(null);
const container: Ref<HTMLElement | null> = ref(null);

const closeModal = () => {
    if (showModal.value === false) return;

    showModal.value = false;
    emit('close');
};

const setModalPosition = () => {
    if (container.value) {
        if (untilMDScreen.value) {
            container.value.style.removeProperty('left');
            container.value.style.removeProperty('max-width');
        } else {
            let leftVal = Navigation.LEFT_NAVBAR_WIDTH;
            if (isFourXLScreen.value || Navigation.isNavColumnExtended.value) {
                leftVal += Navigation.RIGHT_NAVBAR_EXPANDED_WIDTH;
            } else {
                leftVal += Navigation.RIGHT_NAVBAR_COLLAPSED_WIDTH;
            }
            container.value.style.setProperty('left', `${leftVal}px`);
            container.value.style.setProperty('max-width', `calc(100% - ${leftVal}px)`);
        }
    }
};

onClickOutside(modal, () => closeModal());

watch(() => props.show, (newValue: boolean) => {
    showModal.value = newValue;
    if (!showModal.value) {
        emit('close');
    }
});

watch(() => Navigation.isNavColumnExtended.value, () => setModalPosition());
watch(() => untilMDScreen.value, () => setModalPosition());
watch(() => isFourXLScreen.value, () => setModalPosition());

const escapeHandler = (e:KeyboardEvent) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};
onMounted(() => {
    window.addEventListener('keydown', escapeHandler);
    setModalPosition();
});
onUnmounted(() => {
    window.removeEventListener('keydown', escapeHandler);
});
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-show="showModal"
                ref="modal-backdrop"
                class="fixed inset-0 z-20 bg-black bg-opacity-[.40]"
            >
                <div
                    ref="container"
                    class="BaseModalContainer absolute inset-x-0 text-center"
                    :class="{
                        'top-[10vh] bottom-[10vh] overflow-y-auto': !fullScreen && !fullHeight,
                        'top-0 bottom-0': fullHeight,
                        'h-full': fullScreen,
                        'BaseModalContainerHidden': !showModal,
                    }"
                >
                    <Transition
                        enter-active-class="transition ease-out duration-300 transform "
                        enter-from-class="opacity-0 translate-y-10 scale-95"
                        enter-to-class="opacity-100 translate-y-0 scale-100"
                        leave-active-class="ease-in duration-200"
                        leave-from-class="opacity-100 translate-y-0 scale-100"
                        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
                    >
                        <div
                            v-if="showModal"
                            ref="modal"
                            class="BaseModalElement shadow-xl relative mx-auto h-full max-w-full text-left"
                            :class="{
                                'pt-[2.75rem] pb-[80px]': !fullScreen,
                                'overflow-hidden bg-white md:w-[46rem] rounded': !fullScreen,
                                'overflow-y-auto w-full': fullScreen,
                            }"
                            role="dialog"
                        >
                            <slot
                                :close-modal="closeModal"
                            />
                            <button
                                v-if="showCloseButton"
                                class="BaseModalCloseButton absolute top-5 right-5 w-6"
                                data-testid="BaseModal closebutton"
                                @click="closeModal"
                            >
                                <svg
                                    viewBox="-4 -2 24 24"
                                >
                                    <XListIcon/>
                                </svg>
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
