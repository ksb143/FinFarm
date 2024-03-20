import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-4xl text-center">
        <p>hello, world!</p>
        <br />
        <p className="font-SDSamliphopang">This is 핀팜</p>
      </h1>
    </>
  );
}

export default App;
