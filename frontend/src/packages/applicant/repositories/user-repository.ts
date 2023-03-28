import type { UserInfo } from '../../shared/types/applicant/types';
import { fetchJson } from './repository-utils';

const ENDPOINT = import.meta.env.VITE_API_USERINFO;

export const getUserInfo = async (): Promise<UserInfo | null> => fetchJson({
    path: ENDPOINT,
    headers: {
        'Content-Type': 'application/json;',
    },
    method: 'GET',
});
