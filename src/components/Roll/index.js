import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './roll.scss';

class Roll extends PureComponent {
    static propTypes = {
        score: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        isStrike: PropTypes.bool.isRequired,
        isSpare: PropTypes.bool.isRequired
    };

    render() {

        let score;
        if (this.props.isStrike) {
            score = 'X'
        } else if (this.props.isSpare) {
            score = '/'
        } else if (this.props.score === 0) {
            score = '-'
        } else {
            score = this.props.score;
        }

        return (
            <span className={`roll${this.props.isActive ? ' roll--active' : ''}`}>
                {score}
            </span>
        );
    }
}

export default Roll;