import React from 'react';
import "./App.css";
import Chat from "../chat/Chat.js";
import Title from "../title/Title.js";
import Dashboard from "../dashboard/Dashboard";

export default class App extends React.Component{
  
    //TODO implement React Router or pass down components to children to swtich pages
  render(){
    return (
      <div className="App" id="darkmode">
        <h1 className="Title">Mystery Machine</h1>
        <Dashboard />
      </div>
    );
  }
}
 