<script setup lang="ts">

</script>

<template>
    <div
        class="BaseSplitView flex h-full overflow-auto bg-gray-50 p-7 2xl:justify-center max-2xl:p-0"
    >
        <slot name="left"/>
        <slot name="right"/>
    </div>
</template>
