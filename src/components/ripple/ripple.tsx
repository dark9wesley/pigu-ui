import React, { useLayoutEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.less';

interface RippleProps {
  rippleStyle: React.CSSProperties | undefined;
}

const Ripple: React.FC<RippleProps> = ({ rippleStyle }) => {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    console.log('挂载');
    setShow(true);

    return () => {
      console.log('卸载');
      setShow(false);
    };
  }, []);

  return (
    <CSSTransition
      in={show}
      classNames="ripple"
      timeout={500}
      onExited={() => {
        console.log('exited');
      }}
    >
      <div className="ripple" style={{ ...rippleStyle }} />
    </CSSTransition>
  );
};

export default Ripple;
