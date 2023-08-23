export const FIELD_TYPE_LIST = [
  { label: 'Title', value: 'title' },
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Email', value: 'email' },
  { label: 'Telephone', value: 'phone' },
  { label: 'Image', value: 'image' },
  { label: 'URL', value: 'url' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Checklist', value: 'checklist' },
  { label: 'Conditional Dropdown', value: 'conditional_dropdown' },
  { label: 'Bardcode Verification', value: 'barcode' },
  { label: 'Signature', value: 'signature' },
  { label: 'Date', value: 'date' },
  { label: 'Date-Future', value: 'date_future' },
  { label: 'Date-Past', value: 'date_past' },
  { label: 'Date-Time', value: 'date_time' },
  { label: 'Date-Time-Future', value: 'date_time_future' },
  { label: 'Date-Time-Past', value: 'date_time_past' },
];
export const DEFAULT_FIELD_ROW = {
  field_name: '',
  agent_can: 'read_write', // read || read_write
  field_type: FIELD_TYPE_LIST[0].value, // text
  value: '',
  is_mandatory: 'not_mandatory', // mandatory || not_mandatory
  child_items: [],
};

export const form_default_value = {
  fields: [DEFAULT_FIELD_ROW],
  config: {
    needOtp: false,
    autoAllocation: null,
    notification: null,
    priceRuleAgent: null,
    priceRuleTask: null,
    teams: [],
  },
};

// REGEX FOR MATCH OUT LIST FROM STRING SEPARETED BY COMMA
/**
 * e.g.
 *
 * const str = "ds djkjd test me , , test1 , test2 , test3,";
 * console.log(str.match(regexForSeperatedCommaString))
 */
export const getOptionsFromSeperatedCommaString = (str) => {
  const regexForSeperatedCommaString = /[^,\s][^\,]*[^,\s]*/g;
  return str.match(regexForSeperatedCommaString);
};
export const keyAccount = 'U9n4bxFzLa6RMkLWV';
export const db_base_path = `/keyAccounts/${keyAccount}/keyAccount_database`;

export const FILE_TYPE_LIST = ['image/jpeg', 'image/png', 'application/pdf'];
