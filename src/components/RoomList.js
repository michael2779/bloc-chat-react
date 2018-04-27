import React, { Component } from 'react';
import '../App.css';

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }


    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            console.log(room);
            this.setState({rooms: this.state.rooms.concat( room ) });
        });
    }

    render(){
        return(
            <section className="section_left">
                {
                    this.state.rooms.map( ( room ) =>
                        
                            <div key={room.key}>{room.name}</div>
                        
                    )
                }


            </section>
            
        );
    }
    
}

export default RoomList;