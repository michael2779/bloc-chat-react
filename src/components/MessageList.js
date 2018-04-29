import React, { Component } from 'react';
import '../App.css';



class MessageList extends Component {
    constructor(props){
        super(props);

            this.state = {
                messages: []
            };

            this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const messagesA = snapshot.val();
            this.setState({messages: this.state.messages.concat(messagesA)})
        });
    }

    render (){

        const activeRoom = this.props.activeRoom;
        
        const messageListing = (
            this.state.messages.map((theseMessages) => {
               console.log(theseMessages.roomid, activeRoom);
                if (theseMessages.roomid === activeRoom) {
                    return <div className="messageStyle" key={theseMessages.key}>{theseMessages.content}</div>
                }
                return null;
            })
        );

        return (
            <section>                
                <p>Room Message</p>
                {messageListing}
            </section>
        );
    }
}
export default MessageList;