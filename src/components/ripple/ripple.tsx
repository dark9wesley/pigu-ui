import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.less';

interface RippleProps {
  in: boolean;
  timeout?: number;
  wrapperStyle?: React.CSSProperties;
  activeStyles?: React.CSSProperties;
}

const Ripple: React.FC<RippleProps> = (props) => {
  return (
    <div
      style={{
        position: 'absolute',
        overflow: 'hidden',
        ...props.wrapperStyle,
        pointerEvents: 'none',
      }}
    >
      <CSSTransition in={props.in} classNames="ripple" timeout={300} unmountOnExit>
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            pointerEvents: 'none',
            ...props.activeStyles,
          }}
        />
      </CSSTransition>
    </div>
  );
};

export default Ripple;
