import { all } from 'redux-saga/effects';

import { watchUser } from 'redux/sagas/user.sagas';
import { watchProjects } from 'redux/sagas/projects.sagas';
import { watchFoda } from 'redux/sagas/foda.sagas';
import { watchPestel } from 'redux/sagas/pestel.sagas';
import { watchMckinsey } from 'redux/sagas/mckinsey.sagas';
import { watchAnsoff } from 'redux/sagas/ansoff.sagas';
import { watchPorter } from 'redux/sagas/porter.sagas';
import { watchBalanceScorecard } from 'redux/sagas/balanceScorecard.sagas';
import { watchOkr } from 'redux/sagas/okr.sagas';
import { watchQuestionnaire } from 'redux/sagas/questionnaire.sagas';
import { watchComments } from 'redux/sagas/comments.sagas';
import { watchMejoraContinua } from 'redux/sagas/mejora.continua.sagas';
import { watchPdca } from './pdca.sagas';

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchProjects(),
    watchFoda(),
    watchPestel(),
    watchMckinsey(),
    watchAnsoff(),
    watchPorter(),
    watchBalanceScorecard(),
    watchOkr(),
    watchComments(),
    watchQuestionnaire(),
    watchMejoraContinua(),
    watchPdca(),
  ]);
}
