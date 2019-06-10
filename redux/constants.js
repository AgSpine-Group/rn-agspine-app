export const REDUX_ACTION_TYPES = {
  CREATE_FORM_STORAGE: 'CREATE_ITEM_STORAGE'
};

export const REDUX_STORAGE_TYPES = {};

export const LOCAL_STORAGE_PATHS = {
  formData: (recordTypeId, recordId) => `${recordTypeId}|${recordId}`,
};
