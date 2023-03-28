<script setup lang="ts">
import { useLang } from '../../../../shared/composables/i18n';

const { t } = useLang();

</script>
<template>
    <div
        data-testid="ApplicantFilterModal"
        class="ApplicantFilterModal flex h-full flex-col"
    >
        <!-- Header -->
        <div class="pb-[44px] pl-[1.5rem]">
            <span class="text-h3">
                <slot name="header"/>
            </span>
        </div>
        <!-- Filter content -->
        <div class="flex flex-col overflow-auto px-[2.75rem] max-md:px-[1.5rem]">
            <div class="flex w-full flex-col border-b-[1px] pb-6">
                <span class="text-h4 font-semiBold">
                    {{ t('label', 'resume') }}
                </span>
                <slot name="cv"/>
            </div>
            <div class="flex flex-col border-b-[1px] py-6">
                <span class="mb-5 text-h4 font-semiBold">
                    {{ t('label', 'keyDate') }}
                </span>
                <div class="flex flex-col">
                    <slot name="keyDate"/>
                </div>
            </div>
            <div class="flex flex-col py-6">
                <span class="mb-5 text-h4 font-semiBold">
                    {{ t('label', 'refineSearch') }}
                </span>
                <div class="flex flex-col 2xl:mr-6 2xl:w-1/2">
                    <slot name="refineSearch"/>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div
            class="absolute bottom-0 left-0 w-full bg-white
                                     px-[38px] py-[1rem] shadow-md 2xl:px-[2.75rem]"
        >
            <div class="flex justify-between">
                <slot name="footer"/>
            </div>
        </div>
    </div>
</template>
