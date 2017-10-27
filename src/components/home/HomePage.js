import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Bowling Game</h1>
                <p>Enjoy playing bowling through this app.</p>
                <Link to="about" className="btn btn-primary btn-lg">About</Link>
            </div>
        );
    }
}

export default HomePage;