import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [test, setTest] = useState;
  useEffect(() => {
    axios.get("/").then(res => setTest(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">{test && test}</header>
    </div>
  );
}

export default App;
