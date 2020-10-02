import {createStore, combineReducers} from 'redux';
import {userReducer, audioListReducer } from '_redux_reducers';  

const rootReducer = combineReducers({
    userReducer: userReducer,
    audioListReducer: audioListReducer,
});
   
export default configureStore = () => createStore(rootReducer);