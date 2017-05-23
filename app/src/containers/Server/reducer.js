import * as actions from './actions';

const getInitialState = () => ({
  queue: [],
  downloads: [],
});

const serverStateReducer = (state = getInitialState(), action) => {
  switch (action && action.type) {
    case actions.GET_SERVER_STATE_SUCCESS:
      console.log('here', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default serverStateReducer;
