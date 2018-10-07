import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import EmotionCard from '../../components/Card/EmotionCard';
import LocationCard from '../../components/Card/LocationCard';
import SendButton from '../../components/UI/Input/SendButton';
import * as actions from '../../store/actions/index';

class TrackMood extends Component {
  componentDidMount() {
    console.log('[TrackMood], mounted');
    this.props.onGetLocation();

    axios
      .get('/api/getWeather')
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  changedHandler = (event, name, value) => {
    this.props.onChange(name, value);
  };

  clickedHandler = (name, value) => {
    this.props.onChange(name, value);
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
            onChange={this.changedHandler}
            onClick={this.clickedHandler}
          />
        ))}
        <LocationCard />
        <SendButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  emotions: state.trackMood.emotions,
});

const mapDispatchToProps = dispatch => ({
  onChange: (emotion, value) => dispatch(actions.change(emotion, value)),
  onGetLocation: () => dispatch(actions.getLocation()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackMood);
