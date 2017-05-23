import { combineReducers } from 'redux';

import serverStateReducer from 'src/containers/Server/reducer';

export default combineReducers({
  serverState: serverStateReducer,
});
