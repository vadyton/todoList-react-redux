import {takeEvery, put } from 'redux-saga/effects'
import { EDIT_TASK } from './action/action-types';

async function fetchEdit() {
}

function* worker() {

}

export default function* watcher() {
  yield takeEvery(EDIT_TASK, worker)
}
