/* eslint-disable */
// @ts-nocheck

const TRACKINGPREFIX = 'BP_AS';

const DATA_GTM_ELEMENT = {
    navigation: 'Navigation',
}

const DATA_GTM_ELEMENT_DETAIL: Record<string, string> = {
    activeSourcing: 'Active Sourcing',
    userDetails: 'User Details',
    logout: 'Logout',
}

const EVENTSPARAMETERS = {
    applicant_id: 'applicant_id',
    company_id: 'company_id',
    element: 'element',
    elementDetail: 'element_detail',
    filters: 'filters',
    form_type: 'form_type',
    keywords: 'keywords',
    locations: 'locations',
    method: 'method',
    view_type: 'view_type',
}

const USERPROPERTIES = {
    customer_type: 'customer_type',
}

// The list of categories for each event parameters
const CATEGORIES = {
    [EVENTSPARAMETERS.filters]: {
        experienceJobfield: 'experienceJobfield',
        experienceYears: 'experienceYears',
        employment: 'employment', 
        salary: 'salary',
        branch: 'branch',
        education: 'education',
        language: 'language',
        readyToMove: 'readyToMove',
        exactSearch: 'exactSearch',
        searchInFilter: 'searchInFilter',
        willingnessToTravel: 'willingnessToTravel',
        homeoffice: 'homeoffice',
    },
    [EVENTSPARAMETERS.element]: {
        searchformRadius: 'Searchform Radius',
    },
    [EVENTSPARAMETERS.method]: {
        activeSourcing: 'Active Sourcing',
    },
    [EVENTSPARAMETERS.form_type]: {
        candidateSearch: 'Candidate Search',
    },
    [EVENTSPARAMETERS.view_type]: {
        candidateSearch : 'Candidate Search', 
        standalone: 'Standalone'
    },
}

const EVENTS = {
    applicantView: 'applicant_view',
    clickElement: 'click_element',
    login: 'login',
    search: 'search',
    applicantRequestInformationSuccess: 'applicant_request_information_success',
};

const tracking = (params) => {
    if (window.dataLayer) {
        window.dataLayer.push(
            params,
        );
    }
}

const getAllCategoriesInString = (
    {
    eventParameter, 
    categories
    }
    :{
    eventParameter: string,
    categories: object
    }): string => {
    if(eventParameter && !!Object.keys(categories).length){
        const stringArray = [];

        Object.entries(categories).forEach(([key ,value])=>{
            if(value){
                stringArray.push(CATEGORIES[eventParameter][key]);
            }
        })
        
    return stringArray.join(', ');
    }

    return '';
}

export {
    CATEGORIES,
    DATA_GTM_ELEMENT,
    DATA_GTM_ELEMENT_DETAIL,
    TRACKINGPREFIX,
    EVENTS,
    EVENTSPARAMETERS,
    USERPROPERTIES,
    getAllCategoriesInString,
    tracking,
};
