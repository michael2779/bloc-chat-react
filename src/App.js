import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdlHXk-lpxc8fxgZqfirPNDEDSNivN00o",
  authDomain: "bloc-chat-react-4f261.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-4f261.firebaseio.com",
  projectId: "bloc-chat-react-4f261",
  storageBucket: "bloc-chat-react-4f261.appspot.com",
  messagingSenderId: "658171361082"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
