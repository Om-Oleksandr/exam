import React from 'react';

const Button = props => {
  const {
    button: { id, btnContent, parContent },
    setActive,
    className
  } = props;
  return (
    <div className={className}>
      <button onClick={() => setActive(id)}>{btnContent}</button>
      <p>{parContent}</p>
    </div>
  );
};

export default Button;
