import React from 'react';
import logo from '../../../assets/images/sun.png';

const Banner = () => {
  return (
    <div className="banner">
      <img src={logo} alt="logo" className="banner__img" />
      <span className="banner__appName">The Weather App</span>
    </div>
  );
};

export default Banner;
