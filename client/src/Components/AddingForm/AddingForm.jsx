import { useEffect, useState } from 'react';
import './AddingForm.css'
import axios from 'axios'
import { withRouter } from 'react-router';
import { baseURL } from '../../App';
let arr = [];
let rows = 5;
for (let i = 0; i < rows; i++) {
    arr.push({
        userId: '',
        date_registration: '',
        date_last_activity: '',
    })
}
function AddingForm(props) {
    debugger
    // let [rows, setRows] = useState(5)
    let [results, setResults] = useState(null)
    let [projectVal, setProjectVal] = useState(false)
    let [rowsVal, setRowsVal] = useState(false)
    let [dateVal, setDateVal] = useState(false)
    useEffect(() => {
        setProjectVal(false)
    }, [props.match.params.project])

    let addUser = (e, index) => {
        let prop = e.target.name;
        let value = e.target.value;
        let dateRegExp=/([0-3]?[0-9]).([0-1]?[0-9]).([12][09][0-9][0-9])/;
        if (
            (value.search(dateRegExp) != -1)
            && (prop == 'date_registration' || prop == 'date_last_activity')
            ) {
            let date=value.match(dateRegExp)
            let year=date[3];
            let mo=date[2];
            let da=date[1];
            arr[index][prop] = new Date(+date[3], +date[2]-1, +date[1])
            debugger
            // arr[index][prop] = new Date(+value.slice(6), +value.slice(3, 5), +value.slice(0, 2))
            console.log(arr)
            setDateVal(false)
        } else {
            arr[index][prop] = value
            console.log(arr)
        }
    }
    let sendUsers = async () => {
        if (props.match.params.project && !rowsVal) {
            debugger
            setRowsVal(false)
            setProjectVal(false)
            let kol = [];
            let users = arr.filter(item => {
                let flag = true
                let all_fields = true;
                let kol_item = 0;
                for (let key in item) {
                    if (item[key] == '') {
                        flag = false
                        kol_item = kol_item + 1
                    }
                }
                if (typeof (item.date_registration) == 'string' && typeof (date_last_activity) == 'string') setDateVal(true)
                kol.push(kol_item)
                if (flag) return item
            }).map(item => ({ ...item, project: JSON.parse(localStorage.getItem('projects'))[props.match.params.project] }))
            if (kol.some(item => kol > 0 && kol < 3)) setRowsVal(true)
            console.log(users)
            console.log(arr)
            if (!rowsVal && !dateVal) {
                debugger
                await axios.post(baseURL+'users/register', { users })
                setProjectVal(false)
                setRowsVal(false)
            }
        } else if (!props.match.params.project) {
            setProjectVal(true)
        }
        console.log(rowsVal)
    }
    let calculate = async () => {
        if (props.match.params.project) {
            let results = await axios.get(baseURL+'users/calculate/' + JSON.parse(localStorage.getItem('projects'))[props.match.params.project])
            let responseStop = new Date()
            console.log(results)
            let responseTime = responseStop - results.data.responseStart;
            results.data.responseTime = responseTime
            setResults(results.data)
            console.log(responseStop - results.data.responseStart)
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
                    {arr.map((item, index) => <tr>
                        <td><input className='table_input' name='userId' onChange={(e) => { addUser(e, index) }} /></td>
                        <td><input className='table_input' name='date_registration' onChange={(e) => { addUser(e, index) }} /></td>
                        <td><input className='table_input' name='date_last_activity' onChange={(e) => { addUser(e, index) }} /></td>
                    </tr>)}
                </table>
                <div className='btn_wrapper'>
                    <div className='add_btn'>
                        <button className='btn' onClick={() => rows + 5}>Add More</button>
                    </div>
                    <button className='btn' onClick={sendUsers}>Save</button>
                    <button className='btn' onClick={calculate}>Calculate</button>
                    <div className='project_validate' style={!projectVal ? { display: 'none' } : { display: 'block' }}>Вам нужно выбрать проект</div>
                    <div className='project_validate' style={!rowsVal ? { display: 'none' } : { display: 'block' }}>Нужно заполнить все поля в сторке</div>
                    <div className='project_validate' style={!dateVal ? { display: 'none' } : { display: 'block' }}>Неправильный формат даты</div>
                </div>
                {!results ? null : <table>
                    <tr><td>Rolling Retation 7 day</td><td>Выборка из БД</td><td>Время расчета</td><td>Время вывода значений</td></tr>
                    <tr><td>{results.RR7} %</td><td>{results.reqTime} мс</td><td>{results.calculateTime} мс</td><td>{results.responseTime} мс</td></tr>
                </table>}
            </div>
        </div>
    );
}

export default withRouter(AddingForm);
