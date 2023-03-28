import { ref, type Ref } from 'vue';

import type { FilterLabel } from '../../shared/types/applicant/types';
import { fetchResult } from './repository-utils';

export const allFiltersLabels: Ref<Array<FilterLabel>> = ref([]);

const CSRF_TOKEN = document.cookie.replace(/(?:^|.*;\s*)ASP-XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');

const LABELS_ENDPOINT = import.meta.env.VITE_API_LABELS;
const LOCATION_ENDPOINT = import.meta.env.VITE_API_LOCATION;

export const getAllFilterLabels = async (lang:string):Promise<{
    data: FilterLabel[],
    error:{
        name: string;
        level: string;
        status: number;
    } | null;
}> => fetchResult({
    path: `${LABELS_ENDPOINT}?lang=${lang}`,
    headers: {
        'Content-Type': 'application/json;',
        'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
    },
    method: 'GET',
});

export const validateLocation = async (location:string):Promise<{
    data: {
        valid: boolean,
    } | never[],
    error:{
        name: string;
        level: string;
        status: number;
    } | null;
}> => fetchResult({
    path: `${LOCATION_ENDPOINT}/valid`,
    headers: {
        'Content-Type': 'application/json;',
        'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
    },
    method: 'POST',
    body: JSON.stringify({
        location,
    }),
});
