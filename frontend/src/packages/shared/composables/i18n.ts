import { computed, ref, unref } from 'vue';

import { button as buttonDe } from '../lang/de/button';
import { button as buttonEn } from '../lang/en/button';
import { input as inputDe } from '../lang/de/input';
import { input as inputEn } from '../lang/en/input';
import { label as labelDe } from '../lang/de/label';
import { label as labelEn } from '../lang/en/label';
import { prompt as promptDe } from '../lang/de/prompt';
import { prompt as promptEn } from '../lang/en/prompt';
import { table as tableDe } from '../lang/de/table';
import { table as tableEn } from '../lang/en/table';
import { validation as validationDe } from '../lang/de/validation';
import { validation as validationEn } from '../lang/en/validation';
import { notification as notificationDe } from '../lang/de/notification';
import { notification as notificationEn } from '../lang/en/notification';

const translationMap: Record<string, Record<string, Record<string, string>>> = {
    de: {
        button: { ...buttonDe },
        input: { ...inputDe },
        label: { ...labelDe },
        prompt: { ...promptDe },
        table: { ...tableDe },
        validation: { ...validationDe },
        notification: { ...notificationDe },
    },
    en: {
        button: { ...buttonEn },
        input: { ...inputEn },
        label: { ...labelEn },
        prompt: { ...promptEn },
        table: { ...tableEn },
        validation: { ...validationEn },
        notification: { ...notificationEn },
    },
};

const lang = ref('de');

const availableLanguages = [
    {
        id: 1,
        label: 'DE',
    },
    {
        id: 2,
        label: 'EN',
    },
];

export const useLang = () => {
    const setLang = (newLang:string) => {
        window.localStorage.setItem('locale', newLang);
        lang.value = newLang;
    };

    const t = (group: string, target: string, options = {}) => unref(computed(() => {
        let string = translationMap[lang.value][group][target];

        for (const [key, value] of Object.entries(options)) {
            string = string.replaceAll(`$${key}`, value);
        }
        return string;
    }));

    return {
        lang,
        availableLanguages,
        setLang,
        t,
    };
};
