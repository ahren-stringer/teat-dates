import './App.css';
import AddingForm from './Components/AddingForm/AddingForm';
import ProjectsList from './Components/ProjectsList/ProjectsList';

function App() {
  return (
    <div className="App">
    <ProjectsList/>
      <AddingForm/>
    </div>
  );
}

export default App;
