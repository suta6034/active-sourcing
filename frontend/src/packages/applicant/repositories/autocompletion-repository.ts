import { fetchJson } from './repository-utils';

const ENDPOINT = import.meta.env.VITE_API_AUTOCOMPLETE;

export const getAutocompletion = async (type: string, value:string):Promise<string[]> => {
    const json = await fetchJson({
        path: `${ENDPOINT}/${type}?prefix=${value}`,
        headers: {
            'Content-Type': 'application/json;',
        },
        method: 'GET',
    });
    return (json || []) as string[];
};
