import React from 'react';
import useFitText from 'use-fit-text';

const FitText = ({
  children,
  style = {},
}) => {
  const { fontSize, ref } = useFitText({ maxFontSize: 10000 });

  const finalStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
    fontSize,
  };

  return (
    <div
      ref={ref}
      style={finalStyle}>
      {/* <p> */}
        {children}
      {/* </p> */}
    </div>
  );
};

export default FitText;