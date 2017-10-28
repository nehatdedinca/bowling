import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Roll from '../roll/RollPage';

class Frame extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        frameNumber: PropTypes.number.isRequired,
        frame: PropTypes.object.isRequired
    };

    render() {

        return (
            <div className={`frame${this.props.isActive ? ' frame--active' : ''}`}>
                <span className="frame-header">{this.props.frameNumber}</span>
                <div className="frame-rolls">
                    {
                        this.props.frame.frameScore.map((score, index) => {
                            let frameScore = this.props.frame.frameScore.reduce((total,cv) => {return total + cv}, 0);

                            return <Roll
                                key={index}
                                score={score}
                                isStrike={index === 0 && score === 10}
                                isSpare={index !== 0 && frameScore === 10 && score !== null}
                                isActive={this.props.frame.activeRoll === index && this.props.isActive}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Frame; 