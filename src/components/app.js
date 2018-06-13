import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './footer';
import Header from './header';
import Landing from './landing';
import { fetchLatLon } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    const hours = new Date().getHours();

    //checks whether day or night, and changes the background image accordingly
    this.state = {
      bgClassName: hours >= 6 && hours < 20 ? 'dayBg' : 'nightBg'
    };

    document.body.classList.add(this.state.bgClassName);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //incase the geloaction is taking a long time and the user has already entered a search, that way we don't override the search that they entered manually
        if (!this.props.weather) {
          this.props.fetchLatLon(position.coords.latitude, position.coords.longitude);
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Landing />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ weather }) => ({ weather });

App.propTypes = {
  fetchLatLon: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchLatLon }
)(App);
