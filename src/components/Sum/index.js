import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './sum.scss';

class Sum extends PureComponent {
    static propTypes = {
        frames: PropTypes.array.isRequired
    };

    render() {
        let pins = this.props.frames
            .map(frame => frame.frameScore.reduce((sum, cv) => sum + cv, 0))
            .reduce((sum, cv) => sum + cv, 0);

        let total = this.props.frames
            .map(frame => frame.result)
            .reduce((sum, cv) => sum + cv, 0);

        return (
            <div className="frame">
                <span className="frame-header">SUM</span>
                <span className="frames-sum">{pins}</span>
                <span className="overall-sum">{total}</span>
            </div>
        );
    }
}

export default Sum;