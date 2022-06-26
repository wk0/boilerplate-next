import { combineReducers } from "redux";
import sampleReducer from "./sample/sampleReducer";
import web3Reducer from "./web3Provider/web3Reducer";

export default combineReducers({
  sampleData: sampleReducer,
  web3Provider: web3Reducer,
});
