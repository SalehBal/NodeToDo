import './App.css';
import axios from 'axios';
var link = 'http://localhost:8000';
function App() {
  async function fetchText() {
    axios.get(link).then((res) => {
      console.log('res', res);
    });
  }
  fetchText();
  return <div className='App'></div>;
}
export default App;
