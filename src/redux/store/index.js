import {createStore, combineReducers} from 'redux';
import {userReducer, audioListReducer, playerReducer } from '_redux_reducers';  

const rootReducer = combineReducers({
    userReducer: userReducer,
    audioListReducer: audioListReducer,
    playerReducer: playerReducer
});

const store = createStore(rootReducer);
   
export default store;