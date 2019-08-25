import React, {useState} from 'react';
import './App.css';
import FomikUserForm from './components/Form';
function App() {
  const [user, setUser] = useState([]);
  return (
    <div className="App">
      <FomikUserForm user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
