import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmotionCard from '../../components/Card/EmotionCard';
import LocationCard from '../../components/Card/LocationCard';
import SendButton from '../../components/UI/Input/SendButton';
import * as actions from '../../store/actions/index';

class TrackMood extends Component {
  componentDidMount() {
    console.log('[TrackMood], mounted');
    this.props.onGetLocation();
  }

  onBlur = () => {
    // get lat long by city name
    // get weather by lat long
    console.log('focused out');
  };

  render() {
    const emoStrings = Object.keys(this.props.emotions);

    return (
      <div>
        {emoStrings.map((emo, id) => (
          <EmotionCard
            key={id}
            value={this.props.emotions[emo].value}
            min={this.props.emotions[emo].min}
            max={this.props.emotions[emo].max}
            question={this.props.emotions[emo].question}
            descriptions={this.props.emotions[emo].descriptions}
            emotionType={emo}
            onChange={(emotion, value) => this.props.onChange(emotion, value)}
          />
        ))}
        <LocationCard
          value={this.props.location.city !== null ? this.props.location.city : 'Unknown'}
          weather={this.props.weather}
          onChanged={event => this.props.onLocationInputChange(event.target.value)}
          onFocus={() => this.props.onLocationInputChange('')}
          onBlur={() => this.onBlur()}
        />
        <SendButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  emotions: state.trackMood.emotions,
  location: state.trackMood.location,
  weather: state.trackMood.weather,
});

const mapDispatchToProps = dispatch => ({
  onChange: (emotion, value) => dispatch(actions.change(emotion, value)),
  onLocationInputChange: value => dispatch(actions.locationInputChange(value)),
  onGetLocation: () => dispatch(actions.getLocation()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackMood);
