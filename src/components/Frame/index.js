import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Roll from '../Roll';
import FrameResult from '../FrameResult';
import './frame.scss';

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
                            let scores = this.props.frame.frameScore.slice(0);
                            if(scores.length > 2) {
                                scores.pop();
                            }

                            let frameScore = scores.reduce((total,cv) => {return total + cv}, 0);

                            return <Roll
                                key={index}
                                score={score}
                                isStrike={(index === 0 || this.props.frameNumber === 10) && score === 10}
                                isSpare={index === 1 && frameScore === 10 && score !== null}
                                isActive={this.props.frame.activeRoll === index && this.props.isActive}
                            />
                        })
                    }
                </div>
                <FrameResult result={this.props.frame.result} />
            </div>
        );
    }
}

export default Frame;