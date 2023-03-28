<script setup lang="ts">
defineProps({
    text: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <div
        :data-text="text"
        class="
                headline
                relative
                text-h3
                font-semiBold
                before:relative
                before:top-0
                before:left-6
                before:inline
                before:text-transparent
                2xl:text-h1"
    >
        <span class="headlineInner absolute top-0 left-0">
            {{ text }}
        </span>
    </div>
</template>
<style scoped>
.headline::before {
    background-image: linear-gradient(
        transparent 50%,
        #daefc0 0,
        #daefc0 100%,
        transparent 0
    );
    content: attr(data-text);
}
</style>
