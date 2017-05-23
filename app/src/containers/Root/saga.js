import { fork } from 'redux-saga/effects';

import { getServerStateWatcher } from 'src/containers/Server/saga';

export default function*() {
  yield fork(getServerStateWatcher);
}
