import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({children, onClick}) => {
  return (
    <button className='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func
};


export default Button;