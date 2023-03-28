<script setup lang="ts">
import { useLang } from '../../../shared/composables/i18n';

import BaseFormSingleSelect from '../../../shared/components/base/BaseFormSingleSelect.vue';

const {
    setLang,
    lang: globalLang,
    availableLanguages,
} = useLang();

function getSelectedLanguage() {
    const curLang = window.localStorage.getItem('locale');
    return availableLanguages.find((lang) => lang.label === curLang?.toUpperCase());
}
</script>
<template>
    <BaseFormSingleSelect
        :label="globalLang.toUpperCase()"
        width="w-[60px]"
        :is-toggle="true"
        :offset-top="-12"
        :offset-right="3"
        :entries="availableLanguages || []"
        :selected="getSelectedLanguage()"
        :green-text="true"
        @selection="(lang) => setLang(lang.label.toLowerCase())"
    />
</template>
