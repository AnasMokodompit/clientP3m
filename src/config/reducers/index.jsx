import { combineReducers } from 'redux'
import userReducer from './userReducer'
import { saveAddDataReducer } from './DataReducerMahasiwa'
import {partisiDosen} from './DataReducerDosen'
import {dataPdf} from './SavePdfReducer'

const rootReducer = combineReducers({
    p3m: userReducer, saveAddDataReducer, partisiDosen, dataPdf,
})

export default rootReducer