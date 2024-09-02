import { useEffect, useState } from 'react'
import './App.css'
import { Viewer } from './Viewer';
import {version} from '../package.json';

function App() {
  const [cpd, setCpd] = useState(null);

  useEffect(() => {
    console.log(`Fabrik Viewer ${version}`);
    // load cpd.json
    fetch("cpd.json").then((res) => res.json()).then((cpd) => {
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
