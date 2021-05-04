import { useEffect, useState } from 'react';
import './ProjectsList.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { baseURL } from '../../App';
// localStorage.clear()
function ProjectsList(props) {
    let [projects, setProjects] = useState(JSON.parse(localStorage.getItem('projects')))
    useEffect(() => {
        debugger
        if (JSON.parse(localStorage.getItem('projects'))) {
            for (let key in JSON.parse(localStorage.getItem('projects'))) {
                arr.push(key)
            }
        }
    }, [projects])

    let [projectInput, setProjectInput] = useState(false);
    let [name, setName] = useState('')
    let arr = []

    if (JSON.parse(localStorage.getItem('projects'))) {
        for (let key in JSON.parse(localStorage.getItem('projects'))) {
            arr.push(key)
        }
    }
    let addProject = async () => {
        let project = await axios.post(baseURL+'project', { name })
        if (!localStorage.getItem('projects')) {
            localStorage.setItem('projects', JSON.stringify({}))
        }
        let projectObj = JSON.parse(localStorage.getItem('projects'));
        projectObj[name] = project.data.id;
        localStorage.setItem('projects', JSON.stringify(projectObj))
        debugger
        setProjects(JSON.parse(localStorage.getItem('projects')))
        setProjectInput(false)
    }
    return (
        <div className="list_wrapper">
            <div className='list_item'>Pojects</div>
            {!localStorage.getItem('projects') ? null : <ul className='list'>
                {arr.map(item => <NavLink to={'/' + item}>
                    <li className='list_item'>
                        {item}
                    </li>
                </NavLink>)}
            </ul>}
            {!projectInput ? null : <div className='project_form'>
                <span className='close' onClick={() => { setProjectInput(false) }}>&times;</span>
                <label htmlFor="new_project" className="input_label">Name:</label>
                <input id="new_project" className='project_input' value={name} onChange={(e) => { setName(e.target.value) }} />
                <button className='btn' onClick={() => { addProject() }}>Create</button>
            </div>}
            {projectInput ? null : <div className='list_item' style={{ border: 'none' }} onClick={() => { setProjectInput(true) }}>Add new project</div>}
        </div>
    );
}

export default ProjectsList;
