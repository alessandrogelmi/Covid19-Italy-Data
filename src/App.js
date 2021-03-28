import React, {useEffect} from 'react'
import "./App.scss";
import CovidData from "./covid/daticovid";
import ReactGa from 'react-ga';

function App() {

  useEffect(() => {
    ReactGa.initialize('UA-193165358-1')
    ReactGa.pageview('/')
  })

  return (
    <div className="App">
        <CovidData />
    </div>
  );
}

export default App;
