export const API_BASEPP_URL = 'pp.api.staging.unifiedpractice.com/t';
export const BASE_API_URL_CALENDAR = 'unifiedpractice.com/Public/coreapi/api/clinic/organization'
export const PP_CLINIC = 'automation-cypress';
export const PP_CLINIC_UNIVERSITY = 'automation-cypress-university';
export const BASE_API_PP_URL = 'https://pp.api.staging.unifiedpractice.com/t/'
export const FINAL_API_PP_URL = '/organization'
export const FIRST_PART_STAGING_URL = 'https://staging'
export const FIRST_PART_LIVE_URL = 'https://ehr'


export const FINAL_API_STAGING_CALENDAR = () => `${FIRST_PART_STAGING_URL}.${BASE_API_URL_CALENDAR}`;

export const FINAL_API_STAGING_PP = () => `${BASE_API_PP_URL}${PP_CLINIC}${FINAL_API_PP_URL}`
export const FINAL_API_STAGING_PP_UNIVERSITY = () => `${BASE_API_PP_URL}${PP_CLINIC_UNIVERSITY}${FINAL_API_PP_URL}`

// unifiedpractice.com/Public/coreapi/api/clinic/organization
