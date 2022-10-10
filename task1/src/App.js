
import './App.css';
import Main from './components/Main';
import TaskState from './context/TaskState';

function App() {
  return (
    
    <TaskState>
      <Main/>
    </TaskState>


  );
}

export default App;
