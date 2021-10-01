import {combineReducers} from "redux";
import ApiReducer from "./ApiReducer";
import TransferReducer from "./TransferReducer";
import CreditReducer from "./CreditReducer";


const reducers = combineReducers({
    ApiReducer,
    TransferReducer,
    CreditReducer
});

export default reducers;
