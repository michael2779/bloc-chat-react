import React, { Component } from 'react';
import '../App.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            showModal:false,
            newRoomName: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }


    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat( room ) });
        });
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    handleChange(event) {
        this.setState({newRoomName: event.target.value});
    }

    createRoom(event) {
        event.preventDefault();
        
        let newRoomPush = this.state.newRoomName;
        
        this.roomsRef.push({
             name:newRoomPush
        });
        
        this.setState({newRoomName:""});
        
        this.handleCloseModal();
    }

    selectRoom(room) {
        this.props.activeRoom(room);
    }

    render(){

        return(
            <section className="section_left">
                <h2>Bloc Chat</h2>
                
                <button className="button_New_Room" onClick={this.handleOpenModal}>Add New Room</button>
            
                {
                    this.state.rooms.map( ( room ) =>    
                        <div className='roomStyle' key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</div>
                    )
                }
                
                <ReactModal 
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                >
                    <form onSubmit={this.createRoom.bind(this)}>              
                        <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } />
                        <button type="submit">Submit</button>
                    </form>
                </ReactModal>

            </section>
        );
    }
    
}

export default RoomList;