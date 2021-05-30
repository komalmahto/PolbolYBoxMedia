import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './Reducers'
import storage from 'redux-persist/lib/storage' // defaults to localS
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {}

const middleware =[thunk]
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'] // or blacklist to exclude specific reducers
  };
  

  const presistedReducer = persistReducer(persistConfig, rootReducer );

  const store = createStore(presistedReducer,composeWithDevTools(applyMiddleware(...middleware)))
  const persistor = persistStore(store);
  
  
  export  {store,persistor};