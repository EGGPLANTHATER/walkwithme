import { useState } from 'react';
import Header from './components/Header/Header';
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return <Header isLoggedIn={true} />;
}

export default App;
