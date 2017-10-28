// This component handles the App templates used on every page
import React, {PropTypes} from 'react';
import Header from "./common/Header";
import DevTools from "../../tools/devTools";

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header/>
                {this.props.children}
                {__DEV__ && <DevTools/>}
            </div>
        );
    }
}

App.PropTypes = {
    children: PropTypes.object.isRequired
};

export default App;