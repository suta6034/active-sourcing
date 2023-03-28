<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<template>
    <div class="relative h-full w-full">
        <div
            v-bind="$attrs"
            class="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]"
        >
            <slot/>
        </div>
    </div>
</template>
