import React, { Component } from 'react';
import Footer from './footer';
import Header from './header';
import Landing from './landing';

class App extends Component {
  constructor(props) {
    super(props);

    const hours = new Date().getHours();

    //checks whether day or night, and changes the background image accordingly
    this.state = {
      bgClassName: hours >= 6 && hours < 20 ? 'dayBg' : 'nightBg'
    };
  }
  render() {
    console.log(this.state);
    return (
      <div className={`app ${this.state.bgClassName}`}>
        <Header />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
