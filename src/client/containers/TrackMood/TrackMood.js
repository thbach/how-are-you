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
    console.log('focused out', this.props.location.city);
    if (this.props.location.city !== null) {
      // get weather by lat lng
      // update info text
      this.props.onGetLocationFromString(this.props.location.city);
    }
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
          onBlur={value => this.onBlur(value)}
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
  onGetLocationFromString: locString => dispatch(actions.getLocationFromString(locString)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackMood);
