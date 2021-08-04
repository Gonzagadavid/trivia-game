import { combineReducers } from 'redux';
import gravatar from './gravatar';

import user from './user';

const reducer = combineReducers({ user, gravatar });

export default reducer;
