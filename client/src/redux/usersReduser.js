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
    calcVal: false
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
        case SET_USERS:
            action.prevUsers[action.index][action.prop] = action.value
            let arr = [...action.prevUsers];
            debugger
            return { ...state, users: arr }
        case SET_USERS_KOL:
            let new_arr=[...action.prevUsers]
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

export default usersReduser