import * as AutocompletionService from '../../applicant/repositories/autocompletion-repository';

export enum AUTOCOMPLETION_TYPES {
    LOCATION = 'location',
    KEYWORD = 'keyword',
}

export const getAutocompletion = async (type: AUTOCOMPLETION_TYPES, value: string):Promise<string[]> => {
    const result = await AutocompletionService.getAutocompletion(type, value);
    if (result) {
        return result;
    }
    return [];
};
