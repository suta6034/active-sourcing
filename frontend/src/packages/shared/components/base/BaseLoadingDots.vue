<template>
    <div class="BaseLoadingDots inline-flex">
        <span class="inline-block h-3 w-3 animate-loading rounded-full bg-green-600"/>
        <span class="ml-2 inline-block h-3 w-3 animate-loading rounded-full bg-green-600"/>
        <span class="ml-2 inline-block h-3 w-3 animate-loading rounded-full bg-green-600"/>
    </div>
</template>

<style scoped>
    div span:nth-child(2) {
        animation-delay: 100ms;
    }
    div span:nth-child(3) {
        animation-delay: 200ms;
    }
</style>
