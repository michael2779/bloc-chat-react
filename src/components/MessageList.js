import React, { Component } from 'react';
import '../App.css';



class MessageList extends Component {
    constructor(props){
        super(props);

            this.state = {
                messages: [],
                newContentInfo: ""
            };

            this.messagesRef = this.props.firebase.database().ref('messages');
            
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messagesA = snapshot.val();
            this.setState({messages: this.state.messages.concat(messagesA)})
        });

        console.log(this.props.firebase.database.ServerValue.TIMESTAMP);
    }

    createMessageHandler(event) {
        event.preventDefault();
        
        let newContentPush = this.state.newContentInfo;
        
        this.messagesRef.push({
             content: newContentPush,
             username: this.props.currentUser,
             roomid: this.props.activeRoom,
             sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        
        this.setState({newRoomName:""});
    }

    handleChange(event) {
        this.setState({newContentInfo: event.target.value});
    }

    render (){

        const activeRoom = this.props.activeRoom;
        

        const messageListing = (
            this.state.messages.map((theseMessages) => {
                let date = new Date(theseMessages.sentAt);
                if (theseMessages.roomid === activeRoom) {
                    return (
                        <section className="messageStyle"> 
                            <div className="user_Name_Style">{theseMessages.username}</div>
                            <div className="sentAt_Style">{date.toLocaleString()}</div>
                            <div className= "message_List_Style" key={theseMessages.key}>{theseMessages.content}</div>
                            
                        </section>
                    )
                    
                }
                return null;
            })
        );

        return (
            <section>                
                <h5>{activeRoom.name} Messages</h5>
                {messageListing}
                <input className="inputMessage" placeholder="Write your message here" value={ this.state.newContentInfo } onChange={ this.handleChange.bind(this) } />
                <button className="button_New_Message"onClick={ this.createMessageHandler.bind(this) }>Submit</button>
            </section>
        );
    }
}
export default MessageList;