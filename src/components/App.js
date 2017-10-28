// This component handles the App templates used on every page
import React, {PropTypes} from 'react';
import Header from "./common/Header";
import PlayerFrameContainer from "../../tools/playerFramesContainer";
import ControlBarContainer from "../../tools/controlBarContainer";
import DevTools from "../../tools/devTools";
import './app.scss';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header/>
                {this.props.children}
                <ControlBarContainer />
                <PlayerFrameContainer />
                {__DEV__ && <DevTools/>}
            </div>
        );
    }
}

App.PropTypes = {
    children: PropTypes.object.isRequired
};

export default App;