// footerReducer.js
import actions from './actions';

const initialState = {
  number: 0,
};

const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_FOOTER:
      return { ...state, number: action.payload };
    default:
      return state;
  }
};

export default footerReducer;
