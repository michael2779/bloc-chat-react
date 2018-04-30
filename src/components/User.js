import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.signInWithPopup = this.signInWithPopup.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    signInWithPopup() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    render () {
        return  (
            <section>
                <p>{this.props.currentUser}</p>
                <button onClick={this.signInWithPopup}>Set User</button>
                <button onClick={this.signOut}>Sign Out</button>
            </section>
        )
    }
}

export default User;
