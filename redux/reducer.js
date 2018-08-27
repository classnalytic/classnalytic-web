import { combineReducers } from 'redux';

import user from './user';
import classroom from './classroom';

const rootReducer = combineReducers({
  user,
  classroom
});

export default rootReducer;
