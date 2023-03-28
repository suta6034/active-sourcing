type RequestError = {
    name: string,
    status: number,
    level: 'major' | 'minor',
};

export type RequestResult = {
    data: object;
    meta?: object | null;
    error?: RequestError | null;
};

export type FetchParameters = {
    path: string,
    headers: Record<string, string>,
    method: 'POST' | 'GET',
    body?: string,
};
