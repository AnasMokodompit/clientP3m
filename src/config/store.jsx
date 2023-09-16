import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const persisConfig = {
    key: 'p3mpolimdo',
    storage
}

const persistedReducer = persistReducer(persisConfig, rootReducer)

const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)))

const persistor = persistStore(store)


export {store, persistor}