import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../redux/reducer'

const makeConfiguredStore = (reducer, initialState) =>
  createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger))

export const makeStore = (initialState, { isServer, req, debug, storeKey }) => {
  if (isServer) {
    return makeConfiguredStore(reducer, initialState)
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      whitelist: ['user'], // make sure it does not clash with server keys
      storage
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = makeConfiguredStore(persistedReducer, initialState)

    store.__persistor = persistStore(store) // Nasty hack

    return store
  }
}
