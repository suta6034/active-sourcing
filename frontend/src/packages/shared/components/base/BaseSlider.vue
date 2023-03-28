<script setup lang="ts">
import {
    ref,
    watch,
    type Ref,
} from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

const props = defineProps({
    modelValue: {
        type: Number as () => number,
        default: 0,
    },
    data: {
        type: [Array<number>, Array<string>, Array<object>, Object],
        default: undefined,
    },
    dataValue: {
        type: String,
        default: '',
    },
    dataLabel: {
        type: String,
        default: '',
    },
    toolTip: {
        type: String as () => 'none' | 'always' | 'focus' | 'hover' | 'active',
        default: 'none',
    },
    direction: {
        type: String as () => 'ltr' | 'rtl' | 'ttb' | 'btt',
        default: 'ltr',
    },
    disabled: {
        type: Boolean,
        defaut: false,
    },
});

const emit = defineEmits(['getModelValue']);

const modelValue: Ref<number | string | Array<number | string>> = ref(props.modelValue);

watch(modelValue, () => {
    emit('getModelValue', modelValue.value);
});
watch(() => props.modelValue, () => {
    modelValue.value = props.modelValue;
});
</script>
<template>
    <div
        v-if="data"
        class="BaseSlider"
    >
        <VueSlider
            v-model="modelValue"
            :adsorb="true"
            :data="data"
            :data-value="dataValue"
            :data-label="dataLabel"
            :tooltip="toolTip"
            :direction="direction"
            :dot-style="{
                width: '12px',
                height: '12px',
            }"
            :disabled="disabled"
        />
    </div>
</template>
<style>
/* rail style */
.vue-slider-rail {
  background-color: #edeff1;
}
.vue-slider:hover .vue-slider-rail {
  background-color: #edeff1;
}
.vue-slider:hover .vue-slider-process {
  background-color: #7c8797;
}

/* process style */
.vue-slider-process {
  background-color: #7c8797;
}

/* marks(bullet points) style */
.vue-slider-mark-step {
  width: 8px;
  height: 8px;
  box-shadow: none;
  background-color: #c9cdd4;
}
.vue-slider-mark-step-active {
  box-shadow: none;
  background-color: #142542;
}
.vue-slider-mark-label {
  font-size: 14px;
  letter-spacing: -0.1px;
}
.vue-slider:hover .vue-slider-mark-step-active {
    box-shadow: none;
}
.vue-slider-mark:first-child .vue-slider-mark-label {
    left: -1px;
    position: relative;
}
.vue-slider-ltr .vue-slider-mark-step {
    top: -2px !important;
    left: -2px !important;
}

/* dot style */
.vue-slider-dot-handle {
  background-color: #142542;
  border: none;
}
.vue-slider-dot-handle-focus {
    box-shadow: 0 0 0 6px rgba(20, 37, 66, 0.25)
}
.vue-slider-dot-handle:hover{
    box-shadow: 0 0 0 6px rgba(20, 37, 66, 0.25)
}
</style>
