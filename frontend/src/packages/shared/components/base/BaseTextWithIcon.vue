<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import BaseClampText from './BaseClampText.vue';
import { BaseFunctions } from './BaseFunctions';

const props = defineProps({
    iconName: {
        type: String,
        default: '',
    },
    element: {
        type: String,
        default: '',
    },
    clamped: {
        type: Boolean,
        default: false,
    },
});
const icon = shallowRef(null);

onMounted(async () => {
    if (props.iconName) {
        await BaseFunctions.getIcon(props.iconName).then((res) => {
            icon.value = res;
        });
    }
});

</script>
<template>
    <div
        class="flex"
    >
        <div class="pr-3">
            <svg
                viewBox="0 0 24 24"
                :aria-labelledby="iconName"
                width="24"
                height="24"
            >
                <Component :is="icon"/>
            </svg>
        </div>
        <BaseClampText
            v-if="clamped"
            :element="element"
        />
        <span v-else> {{ element }}</span>
    </div>
</template>
