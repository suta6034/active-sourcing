<script setup lang="ts">
import { onMounted } from 'vue';
import BaseCenteringContainer from '../packages/shared/components/base/BaseCenteringContainer.vue';
import NoResultIcon from '../packages/shared/assets/icons/NoResultIcon.vue';
import BaseButton from '../packages/shared/components/base/BaseButton.vue';
import BaseIllustration from '../packages/shared/components/base/BaseIllustration.vue';
import { useLang } from '../packages/shared/composables/i18n';

const { t, setLang } = useLang();

onMounted(async () => {
    const langFromStorage = window.localStorage.getItem('locale');
    setLang(langFromStorage || 'de');
});

</script>

<template>
    <div
        class="PageNotFound flex h-full w-full flex-col bg-gray-50"
    >
        <div class="Header h-[60px] w-full bg-white py-4 px-6">
            <RouterLink to="/">
                <BaseButton
                    :navigation="true"
                    size="s"
                    class="float-right"
                >
                    {{ t('button', 'signIn') }}
                </BaseButton>
            </RouterLink>
        </div>
        <div class="Content flex-1">
            <BaseCenteringContainer class="w-1/2">
                <div class="text-center">
                    <div class="PageNotFound rounded bg-white p-3 text-center sm:p-10">
                        <BaseIllustration
                            class="NoResult"
                            :view-box="'0 0 1600 1000'"
                            width="w-full"
                        >
                            <NoResultIcon/>
                        </BaseIllustration>
                        <span class="PageNotFoundLabel text-small font-semiBold md:text-h4 2xl:text-h2">
                            {{ t('label', 'pageNotFound') }}
                        </span>
                    </div>
                </div>
            </BaseCenteringContainer>
        </div>
    </div>
</template>
<style>
html, body, #app {
    height: 100%;
}
</style>
