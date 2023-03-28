<script setup lang="ts">
import {
    onMounted, onUnmounted, ref, type Ref,
} from 'vue';
import { BaseFunctions } from './BaseFunctions';

const props = defineProps({
    refElement: {
        type: Object as () => HTMLElement | null | undefined,
        default: null,
    },
    offsetTop: {
        type: Number,
        default: 0,
    },
    offsetLeft: {
        type: Number,
        default: 0,
    },
    offsetRight: {
        type: Number,
        default: 0,
    },
    maxHeight: {
        type: Number,
        default: null,
    },
    fitContent: {
        type: Boolean,
        default: false,
    },
    fullBorder: {
        type: Boolean,
        default: false,
    },
});

const elementPos: Ref<Record<string, string>> = ref({});
const scrollContainer: Ref<HTMLElement | null> = ref(null);
const container: Ref<HTMLElement | null> = ref(null);
const maxHeightValue: Ref<number | null> = ref(props.maxHeight);
const isPosOnTop: Ref<boolean> = ref(false);

const emit = defineEmits(['outsideScrollOrResize']);

const checkPosition = (): void => {
    if (container.value && props.refElement && props.maxHeight != null && elementPos.value) {
        const containerPos = container.value.getBoundingClientRect();
        const refElemPos = props.refElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        if (containerPos.top + containerPos.height > windowHeight) {
            // check if there is space above the ref Element
            if (refElemPos.top - containerPos.height > 0) {
                elementPos.value.top = `${refElemPos.top - containerPos.height}px`;
                isPosOnTop.value = true;
            } else {
                // there is no space above or below the element. Check on which side there is more
                // space and then put the container there with a minimized height
                const topSpace = refElemPos.top;
                const bottomSpace = windowHeight - refElemPos.bottom;
                if (topSpace > bottomSpace) {
                    maxHeightValue.value = topSpace - 2;
                    elementPos.value.top = `${refElemPos.top - maxHeightValue.value}px`;
                    isPosOnTop.value = true;
                } else {
                    maxHeightValue.value = bottomSpace - 2;
                    isPosOnTop.value = false;
                }
            }
        }
        if (containerPos.left + containerPos.width > windowWidth) {
            // check if there is space on the right side of the ref Element
            elementPos.value.left = `${refElemPos.right - containerPos.width}px`;
        }
    }
};

const setElementPos = (): void => {
    if (props.refElement) {
        const clientRect = props.refElement.getBoundingClientRect();
        let { width, left } = clientRect;

        if (props.offsetLeft > 0) {
            left = clientRect.left + props.offsetLeft;
            width -= props.offsetLeft;
        }
        if (props.offsetRight > 0) {
            left -= props.offsetRight;
        }
        elementPos.value = {
            top: `${clientRect.bottom + props.offsetTop}px`,
            left: `${left}px`,
            width: `${width}px`,
        };
        setTimeout(() => {
            checkPosition();
        }, 0);
    } else {
        elementPos.value = {};
    }
};

const onScrollOrResize = () => {
    emit('outsideScrollOrResize');
};

onMounted(() => {
    setElementPos();
    if (props.refElement) {
        scrollContainer.value = BaseFunctions.getScrollContainer(props.refElement);
        if (scrollContainer.value) {
            scrollContainer.value.addEventListener('scroll', onScrollOrResize);
        }
        window.addEventListener('resize', onScrollOrResize);
    }
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', onScrollOrResize);
    }
    window.removeEventListener('resize', onScrollOrResize);
});
</script>
<template>
    <div
        ref="container"
        class="BaseFixedContainer fixed z-30 rounded-b border border-gray-300 shadow"
        :class="{
            'overflow-auto': maxHeightValue != null,
            'border-t-0': !isPosOnTop && !fullBorder,
        }"
        :style="{
            width: fitContent ? undefined : elementPos.width,
            top: elementPos.top,
            left: elementPos.left,
            maxHeight: maxHeightValue ? maxHeightValue + 'px' : undefined,
            maxWidth: fitContent ? 'fit-content' : undefined
        }"
    >
        <slot/>
    </div>
</template>
