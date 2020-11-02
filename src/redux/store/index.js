import {createStore, combineReducers} from 'redux';
import {
    userReducer, 
    audioListReducer, 
    historyReducer,
    playerReducer, 
    patientCodeReducer ,
    tagsReducer
} from '_redux_reducers';  

const rootReducer = combineReducers({
    userReducer: userReducer,
    audioListReducer: audioListReducer,
    historyReducer: historyReducer,
    playerReducer: playerReducer,
    patientCodeReducer: patientCodeReducer,
    tagsReducer: tagsReducer
});

const store = createStore(rootReducer);
   
export default store;