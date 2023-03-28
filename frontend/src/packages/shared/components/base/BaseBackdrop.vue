<script setup lang="ts">
import {
    ref, watchEffect,
} from 'vue';

const props = defineProps({
    showBackdrop: {
        type: Boolean,
        default: false,
    },
    isPartial: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['activateBackdrop']);

const show = ref(false);

const closeBackdrop = () => {
    show.value = false;
    emits('activateBackdrop', false);
};
watchEffect(() => {
    show.value = props.showBackdrop;
});

</script>
<template>
    <Transition
        name="backdrop-fade"
        mode="out-in"
        class="duration-500 ease-out"
        enter-from-class="translate-y-[200px] opacity-0"
        leave-to-class="translate-y-[200px] opacity-0"
    >
        <div
            v-if="show"
            data-testid="BaseBackdrop"
            class="BaseBackdrop absolute inset-0 z-20 bg-gray-700 bg-opacity-[.50]"
            :class="{'z-10': isPartial}"
            @click="closeBackdrop"
        />
    </Transition>
</template>
