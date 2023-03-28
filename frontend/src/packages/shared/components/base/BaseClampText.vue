<script setup lang="ts">
import {
    onMounted, onUnmounted, ref, type Ref,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import BaseFixedContainer from './BaseFixedContainer.vue';
import { useLang } from '../../composables/i18n';

defineProps({
    element: {
        type: String,
        default: '',
    },
});

const { t } = useLang();
const showMoreButton: Ref<boolean> = ref(false);
const showAllElementsContainer: Ref<boolean> = ref(false);
const clampedContainer: Ref<null | HTMLElement> = ref(null);
const clampedTextElement: Ref<HTMLElement | null> = ref(null);

function checkTextOverflow() {
    if (clampedTextElement.value) {
        showMoreButton.value = clampedTextElement.value.scrollHeight > clampedTextElement.value.clientHeight;
    }
}
onClickOutside(clampedContainer, () => {
    showAllElementsContainer.value = false;
});
onMounted(async () => {
    window.addEventListener('resize', checkTextOverflow);
    checkTextOverflow();
});
onUnmounted(() => {
    window.removeEventListener('resize', checkTextOverflow);
});

</script>
<template>
    <div
        ref="clampedContainer"
        class="ClampedContainer flex text-gray-600"
    >
        <span
            ref="clampedTextElement"
            class="ClampedTextElement break-all line-clamp-1"
        >
            {{ element }}
        </span>
        <span
            v-if="showMoreButton"
            class="ShowMoreButton cursor-pointer underline"
            @click="showAllElementsContainer = !showAllElementsContainer"
        >{{ t('button', 'more') }}</span>
    </div>
    <BaseFixedContainer
        v-if="showAllElementsContainer"
        :ref-element="clampedContainer"
        :full-border="true"
        :offset-right="16"
        class="ShowAllElementContainer"
        @outside-scroll-or-resize="() => showAllElementsContainer = false"
    >
        <div class="rounded-b bg-white py-3 px-5">
            {{ element }}
        </div>
    </BaseFixedContainer>
</template>
