import { combineReducers } from 'redux';
import reducerGravatar from './gravatar';

import user from './user';

const reducer = combineReducers({ user, reducerGravatar });

export default reducer;
