import React from 'react';
import Banner from './banner';

const Header = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <h1 className="header__title">Your weather when it really matters!</h1>
      </div>
      <Banner />
    </div>
  );
};

export default Header;
