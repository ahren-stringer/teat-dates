import { useState } from 'react';
import './AddingForm.css'
import axios from 'axios'

function AddingForm() {
    let [rows, setRows] = useState(10)
    let arr = []
    for (let i = 0; i < rows; i++) {
        arr.push({
            userId: '',
            date_registration: '',
            date_last_activity: ''
        })
    }
    // let usaersArr=[];
    let addUser = (e, index) => {
        // if (arr.some(item=>item[e.target.name]==e.target.value)){
        //     arr.find(item=>item[e.target.name]==e.target.value)[e.target.name]=e.target.value
        //     return
        // }
        // arr.push({})
        let prop=e.target.name;
        let value=e.target.value
        if (prop == 'userId') {
            arr[index][prop] = value
            console.log(arr)
        }else if (value.search(/[0-3][0-9].[0-1][0-9].[12][09][0-9][0-9]/)!=-1){
            let day=+value.slice(6);
            let month=+value.slice(3,5);
            let year=+value.slice(0,2);
            debugger
            arr[index][prop]=new Date(+value.slice(6),+value.slice(3,5),+value.slice(0,2))
            console.log(arr)
        }

    }
    let sendUsers= async()=>{
        let users=arr.filter(item=>{
            let flag=true
            for (let key in item){
                if (item[key]=='') flag=false
            }
            if (flag) return item
        })
        console.log(users)
        await axios.post('http://localhost:8001/users/register',{users})
    }
    let calculate= async()=>{
        let results=await axios.get('http://localhost:8001/users/calculate')
        let responseStop=new Date().getTime()
        console.log(results)
        console.log(responseStop-results.data.responseStart)
    }
    return (
        <div className="form_wrapper">
            <table>
                <tr><td>UserID</td><td>Date Registration</td><td>Date Last Activity</td></tr>
                {arr.map((item, index) => <tr>
                    <td><input name='userId' onChange={(e) => { addUser(e, index) }} /></td>
                    <td><input name='date_registration' onChange={(e) => { addUser(e, index) }} /></td>
                    <td><input name='date_last_activity' onChange={(e) => { addUser(e, index) }} /></td>
                </tr>)}
                <button onClick={sendUsers}>Send</button> 
                <button onClick={calculate}>Calculate</button>
            </table>
        </div>
    );
}

export default AddingForm;
