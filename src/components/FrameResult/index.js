import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './frame-result.scss';

class FrameResult extends PureComponent {
    static propTypes = {
        result: PropTypes.number
    };

    render() {
        return (
            <span className='frame-result'>{this.props.result}</span>
        );
    }
}

export default FrameResult;