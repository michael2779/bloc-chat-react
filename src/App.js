import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

activeRoom(room) {
  this.setState({activeRoom: room})
}

  render() {
    const showMessages = this.state.activeRoom;

    return (
     <section >
      <RoomList 
        firebase={firebase}
        activeRoom={this.activeRoom}
      />
      
      { showMessages ?
        <MessageList 
          firebase={firebase}
          activeRoom={this.state.activeRoom.key}
        />
      :null
      }

     </section> 
    );
  }
}

export default App;
