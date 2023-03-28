import type { Ref } from 'vue';
import { ref } from 'vue';

import type {
    Applicant, Applicants, ApplicantSearchData, SearchTotalOptions, MessagingObject,
} from '../types/applicant/types';
import type { ProfileData } from '../types/profile/types';
import * as ApplicantService from '../../applicant/repositories/applicant-repository';

const applicants:Ref<Applicants<Applicant[]>> = ref({
    data: [],
    meta: null,
    error: null,
});

const applicantSearchData:Ref<ApplicantSearchData> = ref({
    currentPage: 1,
    currentItems: 0,
    total: 0,
    isNewSearch: false,
    isLoading: false,
});

const applicantProfileData:Ref<ProfileData | null> = ref(null);

const selectedApplicantId = ref('');
const standAloneApplicantId = ref('');
const applicantApprovalId = ref('');
const profileLoading = ref(false);

const uniqueData = (data: Array<Applicant>): Array<Applicant> => {
    let unique: Array<Applicant> = [];
    if (data.length) {
        const uniqueIds: Array<string> = [];
        unique = data.filter((x: Applicant) => {
            if (!uniqueIds.includes(x.id)) {
                uniqueIds.push(x.id);
                return true;
            }
            return false;
        });
    }
    return unique;
};

export const useApplicant = () => {
    const search = async (filterOptions:SearchTotalOptions, append?: boolean) => {
        if (standAloneApplicantId.value) {
            standAloneApplicantId.value = '';
            window.history.pushState('', '', '/');
        }
        applicantSearchData.value.isLoading = true;
        if (!append) {
            selectedApplicantId.value = '';
            applicantSearchData.value.currentPage = 1;
            applicantSearchData.value.isNewSearch = !!applicants.value.data.length;
        }
        const result = await ApplicantService.search(filterOptions, applicantSearchData.value.currentPage);
        if (append) {
            result.data = [...applicants.value.data, ...result.data];
        }

        applicants.value = result;
        applicantSearchData.value.currentItems = applicants.value.data.length;
        applicantSearchData.value.total = applicants.value.meta?.pagination.total || 0;
        result.data = uniqueData(result.data);
        applicantSearchData.value.isLoading = false;
        applicantApprovalId.value = '';
    };
    const getProfileData = async (applicantId: string) => {
        if (!/^-?\d+$/.test(applicantId)) {
            applicantProfileData.value = null;
            return;
        }
        profileLoading.value = true;
        const result = await ApplicantService.getProfileData(applicantId);
        if (result) {
            applicantProfileData.value = result;
        }
        profileLoading.value = false;
    };
    const getNextPage = async (filterOptions:SearchTotalOptions) => {
        applicantSearchData.value.currentPage += 1;
        search(filterOptions, true);
    };
    const sendApprovalMessage = async (messagingObject:MessagingObject) => {
        const response = await ApplicantService.sendApprovalMessage(messagingObject);

        return response.ok && response.status <= 300;
    };
    return {
        applicants,
        applicantApprovalId,
        applicantSearchData,
        applicantProfileData,
        getNextPage,
        getProfileData,
        search,
        sendApprovalMessage,
        selectedApplicantId,
        standAloneApplicantId,
        profileLoading,
    };
};
