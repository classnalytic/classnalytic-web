import { combineReducers } from 'redux';

import user from './user';
import classroom from './classroom';
import student from './student';

const rootReducer = combineReducers({
  user,
  student,
  classroom
});

export default rootReducer;
