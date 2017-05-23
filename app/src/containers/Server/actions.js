export const GET_SERVER_STATE_REQUEST = 'GET_SERVER_STATE_REQUEST';
export const GET_SERVER_STATE_SUCCESS = 'GET_SERVER_STATE_SUCCESS';
export const GET_SERVER_STATE_FAIL = 'GET_SERVER_STATE_FAIL';

export const getServerState = () => ({
  type: GET_SERVER_STATE_REQUEST,
});

export const getServerStateSuccess = serverState => ({
  type: GET_SERVER_STATE_SUCCESS,
  payload: serverState,
});

export const getServerStateFail = ({ error }) => ({
  type: GET_SERVER_STATE_FAIL,
  error,
});
