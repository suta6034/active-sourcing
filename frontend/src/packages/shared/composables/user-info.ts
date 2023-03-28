import type { Ref } from 'vue';
import { ref } from 'vue';
import * as UserInfoService from '../../applicant/repositories/user-repository';
import type { UserInfo } from '../types/applicant/types';

export const userInfo:Ref<UserInfo | null> = ref(null);

export const getUserInfo = async () => {
    const result = await UserInfoService.getUserInfo();
    if (result) {
        return result;
    }
    return null;
};
