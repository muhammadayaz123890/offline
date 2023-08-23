// actions.js
import actions from './actions';

export const updateFooter = (newNumber) => {
  return {
    type: actions.UPDATE_FOOTER,
    payload: newNumber,
  };
};
