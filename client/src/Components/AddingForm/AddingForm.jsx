import { useEffect, useState } from 'react';
import './AddingForm.css'
import axios from 'axios'
import { withRouter } from 'react-router';
import { baseURL } from '../../App';
import { connect } from 'react-redux';
import { setCalcVal, setDateVal, setProjectVal, setResults, setRowsVal,setUsers,setUsersKol } from '../../redux/usersReduser';

function AddingForm(props) {
debugger
    let [succes, setSucces]=useState(false)
    let [loader, setLoader]=useState(false)
    useEffect(() => {
        props.setProjectVal(false)
    }, [props.match.params.project])

    let addUser = (e, index) => {
        props.setRowsVal(false)
        props.setDateVal(false)
        let prop = e.target.name;
        let value = e.target.value;  
        props.setUsers(props.users,index,prop,value)

    }
    let sendUsers = async () => {
        if (props.match.params.project && !props.rowsVal) {
            setLoader(true)
            let rowsVal=false;
            let dateVal=false;
            props.setRowsVal(false)
            props.setProjectVal(false)
            let dateRegExp = /([0-3]?[0-9]).([0-1]?[0-9]).([12][09][0-9][0-9])/;
            let kol = [];
            let users = props.users.filter(item => {
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
                props.setRowsVal(true)
                return
            }

            users=users.map(item => {
                let dateRegExp = /([0-3]?[0-9]).([0-1]?[0-9]).([12][09][0-9][0-9])/;
                let date_reg,date_last_act;
                if ((item.date_registration.search(dateRegExp) != -1)) {
                    let date = item.date_registration.match(dateRegExp)
                    date_reg=new Date(+date[3], +date[2] - 1, +date[1])
                    debugger
                }
                if ((item.date_last_activity.search(dateRegExp) != -1)) {
                    let date = item.date_last_activity.match(dateRegExp)
                    date_last_act=new Date(+date[3], +date[2] - 1, +date[1])
                }
                if ((!date_reg || !date_last_act)
                && item.date_registration !== ''
                && item.date_last_activity !== '') {
                    props.setDateVal(true)
                    dateVal=true
            }
                return { ...item,
                     project: JSON.parse(localStorage.getItem('projects'))[props.match.params.project],
                     date_registration:date_reg,
                     date_last_activity:date_last_act }
            })
            debugger
            if (!props.rowsVal && !dateVal) {
                await axios.post(baseURL + 'users/register', { users })
                setLoader(false)
                props.setProjectVal(false)
                props.setRowsVal(false)
                props.setCalcVal(false)
                setTimeout(() => {
                    setSucces(true)
                }, 2000);
            }
        } else if (!props.match.params.project) {
            props.setProjectVal(true)
        }
        console.log(props.rowsVal)
    }
    let calculate = async () => {
        if (props.match.params.project) {
            let responseStart = new Date().getTime()
            axios.get(baseURL + 'users/calculate/' + JSON.parse(localStorage.getItem('projects'))[props.match.params.project])
                .then(results => {
                    let responseStop = new Date().getTime()
                    console.log(results)
                    let responseTime = responseStop - responseStart;
                    results.data.responseTime = responseTime
                    props.setResults(results.data)
                }, results => {
                    debugger
                    props.setCalcVal(true)
                    props.setResults(results)
                    setTimeout(() => {
                        props.setCalcVal(false)
                        props.setResults(null)
                    }, 2000);
                })
        }else{
            props.setProjectVal(true)
        }
    }
    return (
        <div className="form_wrapper">
            <div className='form_inner'>
                {!props.match.params.project
                    ? <div className='title'>Select a project</div>
                    : <div className='title'>Project: {props.match.params.project}</div>}
                <table>
                    <tr><td>UserID</td><td>Date Registration</td><td>Date Last Activity</td></tr>
                    {props.users.map((item, index) => <tr>
                        <td><input className='table_input' name='userId' value={item.userId} onChange={(e) => { addUser(e, index) }} /></td>
                        <td><input className='table_input' name='date_registration' value={item.date_registration.toString()} onChange={(e) => { addUser(e, index) }} /></td>
                        <td><input className='table_input' name='date_last_activity' value={item.date_last_activity} onChange={(e) => { addUser(e, index) }} /></td>
                    </tr>)}
                </table>
                <div className='btn_wrapper'>
                    <div className='add_btn'>
                        <button className='btn' onClick={() => props.setUsersKol(props.users)}>Add More</button>
                    </div>
                    <button className='btn' onClick={sendUsers}>Save</button>
                    <button className='btn' onClick={calculate}>Calculate</button>
                    <div className='project_validate' style={!props.projectVal ? { display: 'none' } : { display: 'block' }}>Вам нужно выбрать проект</div>
                    <div className='project_validate' style={!props.rowsVal ? { display: 'none' } : { display: 'block' }}>Нужно заполнить все поля в сторке</div>
                    <div className='project_validate' style={!props.dateVal ? { display: 'none' } : { display: 'block' }}>Неправильный формат даты</div>
                    <div className='succes' style={!loader ? { display: 'none' } : { display: 'block' }}>Loading...</div>
                    <div className='succes' style={!succes ? { display: 'none' } : { display: 'block' }}>Пользователи сохранены</div>
                </div>
                {!props.results ? null : props.calcVal
                    ? <div className='project_validate'>{props.results.response.data.message}</div>
                    : <table>
                        <tr><td>Rolling Retation 7 day</td><td>Выборка из БД</td><td>Время расчета</td><td>Время вывода значений</td></tr>
                        <tr><td>{props.results.RR7} %</td><td>{props.results.reqTime} мс</td><td>{props.results.calculateTime} мс</td><td>{props.results.responseTime} мс</td></tr>
                    </table>}
            </div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        usersKol: state.users.usersKol,
        results: state.users.results,
        projectVal: state.users.projectVal,
        rowsVal: state.users.rowsVal,
        dateVal: state.users.dateVal,
        calcVal: state.users.calcVal
    }
}

export default connect(mapStateToProps,{setCalcVal, setDateVal, setProjectVal, setResults, setRowsVal,setUsers,setUsersKol})(withRouter(AddingForm));
