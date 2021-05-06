import './App.css';
import Main from './Components/Main/Main';
import { Route, withRouter } from 'react-router-dom';
 export let baseURL='http://localhost:8001/';
// export let baseURL='';
function App() {
  return (
    <div className="App">
      <Route exact path="/:project?" render={() => <Main />} />
    </div>
  );
}

export default App;
