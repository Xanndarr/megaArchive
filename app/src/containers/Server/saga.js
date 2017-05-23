import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import { fetch } from 'src/fetch';

import { getServerStateSuccess, getServerStateFail } from './actions';

import {
  GET_SERVER_STATE_REQUEST,
  GET_SERVER_STATE_SUCCESS,
  GET_SERVER_STATE_FAIL,
} from './actions';

function* getServerStateWorker() {
  try {
    const serverState = yield call(fetch, 'GET', '/ping');
    console.log(serverState);
    yield put(getServerStateSuccess(serverState));
  } catch (error) {
    console.log(error);
    yield put(getServerStateFail({ error }));
  }
}

export function* getServerStateWatcher() {
  yield* takeLatest(GET_SERVER_STATE_REQUEST, getServerStateWorker);
}
