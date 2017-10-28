import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class PlayerFrames extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        activeFrame: PropTypes.number.isRequired,
        playerFrames: PropTypes.array.isRequired
    };

    render() {
        return (
            <div className={`player-frames player-frames${this.props.isActive ? '--active' : ''}`}>
                {
                    this.props.playerFrames.map((frame, index) => {
                        return <Frame
                                key={index}
                                frameNumber={index+1}
                                isActive={this.props.activeFrame === index}
                                frame={frame}/>
                    })
                }
            </div>
        )
    }
}

export default PlayerFrames; 