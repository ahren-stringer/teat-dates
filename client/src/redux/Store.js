import projectsReduser from './projectsReduser';
import usersReduser from "./usersReduser";
import thunkMiddleware from "redux-thunk"

const { createStore, combineReducers,applyMiddleware} = require("redux");

let redusers= combineReducers({
    prjects:projectsReduser,
    users:usersReduser,
});

let store=createStore(redusers,applyMiddleware(thunkMiddleware));

export default store