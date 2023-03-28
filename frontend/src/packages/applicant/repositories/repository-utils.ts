import type { FetchParameters } from './types';

const getResultFromResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error(new Error(`[${response.status}]: ${response.statusText}`));

        return {
            data: [],
            meta: null,
            error: {
                name: response.statusText,
                status: response.status,
                level: response.status > 499 ? 'major' : 'minor',
            },
        } as T;
    }
    const json = await response.json();

    return {
        data: json.data,
        meta: json.meta,
        error: null,
    } as T;
};

const getJsonFromResponse = async <T>(response: Response): Promise<T | null> => {
    if (response.ok) {
        const json = await response.json();
        return json.data as T;
    }
    // eslint-disable-next-line no-console
    console.error(new Error(`[${response.status}]: ${response.statusText}`));
    return null;
};

export const fetchResponse = async (params: FetchParameters): Promise<Response> => {
    let response = new Response();
    try {
        response = await fetch(params.path, {
            headers: params.headers,
            method: params.method,
            body: params.body,
        });
    } catch (error) {
        response = new Response('', {
            status: 503,
            statusText: (error as Error).message,
        });
        window.location.reload();
    }

    return response;
};

export const fetchResult = async <T>(
    params: FetchParameters,
): Promise<T> => getResultFromResponse(await fetchResponse(params));

export const fetchJson = async <T>(
    params: FetchParameters,
): Promise<T | null> => getJsonFromResponse(await fetchResponse(params));
