import React from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './index.less';

interface RippleProps {
  show: boolean;
  rippleStyle: React.CSSProperties | undefined;
}

const Ripple: React.FC<RippleProps> = ({ show, rippleStyle }) => {
  // const classes = classNames('ripple', {
  //   'ripple-show': show,
  //   'ripple-hide': !show,
  // });

  return (
    <CSSTransition in={show} classNames="ripple" timeout={500} unmountOnExit>
      <div className="ripple" style={{ ...rippleStyle }} />
    </CSSTransition>
  );
};

export default Ripple;
