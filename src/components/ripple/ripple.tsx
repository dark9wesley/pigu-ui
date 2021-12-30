import React, { useLayoutEffect, useState } from 'react';
import classNames from 'classnames';
import './index.less';

interface RippleProps {
  id: string;
  animationEndCallBack: (id: string) => void;
  rippleStyle: React.CSSProperties | undefined;
}

const Ripple: React.FC<RippleProps> = ({ rippleStyle, animationEndCallBack, id }) => {
  const [show, setShow] = useState(false);
  const classes = classNames('ripple', {
    'ripple-show': show,
  });

  useLayoutEffect(() => {
    console.log('挂载');
    setShow(true);

    return () => {
      console.log('卸载');
      setShow(false);
    };
  }, []);

  const handleAnimationEnd = () => {
    animationEndCallBack && animationEndCallBack(id);
  };

  return <div className={classes} style={{ ...rippleStyle }} onAnimationEnd={handleAnimationEnd} />;
};

export default Ripple;
