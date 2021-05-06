import { useEffect, useState } from 'react';
import './AddingForm.css'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setProjectVal,setUsersKol,AddUserThunk,sendUsersThunk,calculate } from '../../redux/usersReduser';

function AddingForm(props) {
debugger
    
    useEffect(() => {
        props.setProjectVal(false)
    }, [props.match.params.project])

    return (
        <div className="form_wrapper">
            <div className='form_inner'>
                {!props.match.params.project
                    ? <div className='title'>Select a project</div>
                    : <div className='title'>Project: {props.match.params.project}</div>}
                <table>
                    <tr><td>UserID</td><td>Date Registration</td><td>Date Last Activity</td></tr>
                    {props.users.map((item, index) => <tr>
                        <td><input className='table_input' name='userId' value={item.userId} onChange={(e) => { props.AddUserThunk(props.users,index,e) }} /></td>
                        <td><input className='table_input' name='date_registration' value={item.date_registration} onChange={(e) => { props.AddUserThunk(props.users,index,e) }} /></td>
                        <td><input className='table_input' name='date_last_activity' value={item.date_last_activity} onChange={(e) => { props.AddUserThunk(props.users,index,e) }} /></td>
                    </tr>)}
                </table>
                <div className='btn_wrapper'>
                    <div className='add_btn'>
                        <button className='btn' onClick={() => props.setUsersKol(props.users)}>Add More</button>
                    </div>
                    <button className='btn' onClick={()=>{props.sendUsersThunk(props.match.params.project,props.rowsVal,props.users)}}>Save</button>
                    <button className='btn' onClick={()=>{props.calculate(props.match.params.project)}}>Calculate</button>
                    <div className='project_validate' style={!props.projectVal ? { display: 'none' } : { display: 'block' }}>Вам нужно выбрать проект</div>
                    <div className='project_validate' style={!props.rowsVal ? { display: 'none' } : { display: 'block' }}>Нужно заполнить все поля в сторке</div>
                    <div className='project_validate' style={!props.dateVal ? { display: 'none' } : { display: 'block' }}>Неправильный формат даты</div>
                    <div className='project_validate' style={!props.noUsers ? { display: 'none' } : { display: 'block' }}>Введите поьзователей</div>
                    <div className='succes' style={!props.succes ? { display: 'none' } : { display: 'block' }}>Пользователи сохранены</div>
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
        calcVal: state.users.calcVal,
        succes: state.users.succes,
        noUsers: state.users.noUsers,
    }
}

export default connect(mapStateToProps,{setProjectVal,setUsersKol,AddUserThunk,sendUsersThunk,calculate})(withRouter(AddingForm));
