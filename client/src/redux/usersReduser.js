import axios from "axios";
import { baseURL } from "../App";

const SET_RESULTS = 'SET_RESULTS';
const SET_CALC_VAL = 'SET_CALC_VAL';
const SET_POJECT_VAL = 'SET_POJECT_VAL';
const SET_ROWS_VAL = 'SET_ROWS_VAL';
const SET_DATE_VAL = 'SET_DATE_VAL';
const SET_USERS = 'SET_USERS';
const SET_USERS_KOL = 'SET_USERS_KOL';

function usersObj(arr = []) {
    for (let i = 0; i < 5; i++) {
        arr.push({
            userId: '',
            date_registration: '',
            date_last_activity: '',
        })
    }
    debugger
    return arr
}

let init = {
    users: usersObj(),
    // usersKol: ,
    results: null,
    projectVal: false,
    rowsVal: false,
    dateVal: false,
    calcVal: false,
    succes: false
};

const usersReduser = (state = init, action) => {
    switch (action.type) {
        case SET_RESULTS:
            return { ...state, results: action.results }
        case SET_POJECT_VAL:
            return { ...state, projectVal: action.projectVal }
        case SET_ROWS_VAL:
            return { ...state, rowsVal: action.rowsVal }
        case SET_DATE_VAL:
            return { ...state, dateVal: action.dateVal }
        case SET_CALC_VAL:
            return { ...state, calcVal: action.calcVal }
        case 'SET_SUCCES':
            return { ...state, succes: action.succes }
        case SET_USERS:
            action.prevUsers[action.index][action.prop] = action.value
            let arr = [...action.prevUsers];
            debugger
            return { ...state, users: arr }
        case SET_USERS_KOL:
            let new_arr = [...action.prevUsers]
            for (let i = 0; i < 5; i++) {
                new_arr.push({
                    userId: '',
                    date_registration: '',
                    date_last_activity: '',
                })
            }
            debugger
            return { ...state, users: new_arr }
        default:
            return state
    }
}

export const setResults = (results) => ({ type: SET_RESULTS, results });
export const setProjectVal = (projectVal) => ({ type: SET_POJECT_VAL, projectVal });
export const setRowsVal = (rowsVal) => ({ type: SET_ROWS_VAL, rowsVal });
export const setDateVal = (dateVal) => ({ type: SET_DATE_VAL, dateVal });
export const setCalcVal = (calcVal) => ({ type: SET_CALC_VAL, calcVal });
export const setUsers = (prevUsers, index, prop, value) => ({ type: SET_USERS, prevUsers, index, prop, value });
export const setUsersKol = (prevUsers) => ({ type: SET_USERS_KOL, prevUsers });
export const setSucces = (succes) => ({ type: 'SET_SUCCES', succes });

export const AddUserThunk = (users, index, e) =>
    async (dispatch) => {
        dispatch(setRowsVal(false))
        dispatch(setDateVal(false))
        let prop = e.target.name;
        let value = e.target.value;
        dispatch(setUsers(users, index, prop, value))
    }

export const sendUsersThunk = (project, rowsVal, usersArr) =>
    async (dispatch) => {
        if (project && !rowsVal) {
            // setLoader(true)
            let dateVal_flag = false;
            dispatch(setRowsVal(false))
            dispatch(setProjectVal(false))
            let kol = [];
            let users = usersArr.filter(item => {
                let flag = true
                let kol_item = 0;
                for (let key in item) {
                    if (item[key] == '') {
                        flag = false
                        kol_item = kol_item + 1
                    }
                }
                kol.push(kol_item)
                if (flag) return item
            })

            console.log(users)
            if (kol.some(item => (item == 1) || (item == 2))) {
                dispatch(setRowsVal(true))
                return
            }

            users = users.map(item => {
                let dateRegExp = /([0-3]?[0-9]).([0-1]?[0-9]).([12][09][0-9][0-9])/;
                let date_reg, date_last_act;
                if ((item.date_registration.search(dateRegExp) != -1)) {
                    let date = item.date_registration.match(dateRegExp)
                    date_reg = new Date(+date[3], +date[2] - 1, +date[1])
                    debugger
                }
                if ((item.date_last_activity.search(dateRegExp) != -1)) {
                    let date = item.date_last_activity.match(dateRegExp)
                    date_last_act = new Date(+date[3], +date[2] - 1, +date[1])
                }
                if ((!date_reg || !date_last_act)
                    && item.date_registration !== ''
                    && item.date_last_activity !== '') {
                    dispatch(setDateVal(true))
                    dateVal_flag = true
                }
                return {
                    ...item,
                    project: JSON.parse(localStorage.getItem('projects'))[project],
                    date_registration: date_reg,
                    date_last_activity: date_last_act
                }
            })
            debugger
            if (!rowsVal && !dateVal_flag) {
                await axios.post(baseURL + 'users/register', { users })
                // setLoader(false)
                dispatch(setProjectVal(false))
                dispatch(setRowsVal(false))
                dispatch(setCalcVal(false))
                dispatch(setSucces(true))
                setTimeout(()=>{
                    dispatch(setSucces(false))
                },3000)
            }
        } else if (!project) {
            dispatch(setProjectVal(true))
        }
    }
export const calculate = (project) =>
    async (dispatch) => {
        if (project) {
            debugger
            let responseStart = new Date().getTime()
            axios.get(baseURL + 'users/calculate/' + JSON.parse(localStorage.getItem('projects'))[project])
                .then(results => {
                    let responseStop = new Date().getTime()
                    console.log(results)
                    let responseTime = responseStop - responseStart;
                    results.data.responseTime = responseTime
                    dispatch(setResults(results.data))
                }, results => {
                    debugger
                    dispatch(setCalcVal(true))
                    dispatch(setResults(results))
                    setTimeout(() => {
                        dispatch(setCalcVal(false))
                        dispatch(setResults(null))
                    }, 2000);
                })
        } else {
            dispatch(setProjectVal(true))
        }
    }

export default usersReduser