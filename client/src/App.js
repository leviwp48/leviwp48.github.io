import React from 'react';
import logo from './logo.svg';
import "./styles/styles.css";
import ChatBox from "./components/ChatBox";
//import './App.css';

export default function App() {
  return (
    <div className="App" id="darkmode">
      <h1> Type to start! </h1>
      <ChatBox />
    </div>
  );
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/