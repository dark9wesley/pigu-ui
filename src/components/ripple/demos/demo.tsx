import React, { useState } from 'react';
import Ripple from '../ripple';
import Button from '../../button';
import RipperWrapper from '../rippleWrapper';

export default () => {
  const [rippleVisible, setRippleVisible] = useState(false);

  return (
    <>
      {/* <Ripple in={rippleVisible} />
      <Button onClick={() => setRippleVisible(!rippleVisible)}>111</Button> */}
      <RipperWrapper>
        <Button size="large" type="primary">
          按钮
        </Button>
      </RipperWrapper>
    </>
  );
};
