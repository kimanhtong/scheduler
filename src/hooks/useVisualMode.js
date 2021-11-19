import {useState} from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace){
      setHistory(mode);
    };
  };
  
  const back = (mode) => {
    if (mode !== initial) {
      setMode(initial);
      setHistory(initial);
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;