import { useState } from 'react';
import './ProjectsList.css'
import axios from 'axios'
// localStorage.clear()
function ProjectsList(props) {

    let [projectInput, setProjectInput]=useState(false);
    let [name, setName]=useState('')
    let arr = [];

    if (JSON.parse(localStorage.getItem('projects'))) {
        for (let key in JSON.parse(localStorage.getItem('projects'))) {
            arr.push(key)
        }
    }
    let addProject=()=>{
        if (!localStorage.getItem('projects')){
            localStorage.setItem('projects',JSON.stringify({}))
        }
        let projectObj=JSON.parse(localStorage.getItem('projects'));
        projectObj[name]='9';
        localStorage.setItem('projects',JSON.stringify(projectObj))
    }
    return (
        <div className="list_wrapper">
            <div className='list_item'>Pojects</div>
            {!localStorage.getItem('projects') ? null : <ul className='list'>
                {arr.map(item => <li>{item}</li>)}
            </ul>}
            {!projectInput ? null: <div>
                <span onClick={()=>{setProjectInput(false)}}>&times;</span>
                <label htmlFor="new_project">Name:</label>
                <input id="new_project" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <button onClick={()=>{addProject()}}>Create</button>
                </div>}
            {projectInput ? null :<div className='list_item' onClick={()=>{setProjectInput(true)}}>Add new project</div>}
        </div>
    );
}

export default ProjectsList;
