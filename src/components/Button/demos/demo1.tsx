import React from 'react';
import Button from '../index';

export default () => (
  <>
    <div>
      <Button type="danger">Primary</Button>
    </div>
    <div>
      <Button disabled>Disabled</Button>
    </div>
    <div>
      <Button type="info" text outline size="large">
        Text
      </Button>
    </div>
    <div>
      <Button
        size="large"
        type="primary"
        style={{ '--border-radius': '20px' }}
        round
        onClick={() => console.log(111)}
      >
        r11
      </Button>
    </div>
  </>
);
