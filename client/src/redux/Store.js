import projectsReduser from './projectsReduser';
import usersReduser from "./usersReduser";

const { createStore, combineReducers} = require("redux");

let redusers= combineReducers({
    prjects:projectsReduser,
    users:usersReduser,
});

let store=createStore(redusers);

export default store