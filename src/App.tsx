import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Viewer } from './Viewer';

function App() {
  const [count, setCount] = useState(0)
  const [cpd, setCpd] = useState(null);

  useEffect(() => {
    // load cpd.json
    fetch("cpd.json").then((res) => res.json()).then((cpd) => {
      console.log(cpd);
      setCpd(cpd);
    });
  }, []);

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        {cpd && <Viewer cpd={cpd} />}
      </div>
    </>
  )
}

export default App
