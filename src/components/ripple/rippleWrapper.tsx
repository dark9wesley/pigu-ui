import React, { useRef, useState } from 'react';
import Ripple from './ripple';

interface RipperWrapperProps {}

const RipperWrapper: React.FC<RipperWrapperProps> = ({ children }) => {
  const wrapper = useRef<null | HTMLDivElement>(null);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | undefined>(undefined);
  const [rippleWrapperStyle, setRippleWrapperStyle] = useState<React.CSSProperties | undefined>(
    undefined,
  );
  const [rippleShow, setRippleShow] = useState(false);

  const handleDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRippleShow(true);
    const rect = (e.target as any).getBoundingClientRect();
    const wrapperStyle = getComputedStyle(e.target as Element);
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    const rippleSize = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2;
    setRippleStyle({
      width: rippleSize,
      height: rippleSize,
      top: y - rippleSize / 2,
      left: x - rippleSize / 2,
      zIndex: 9999999,
      backgroundColor: wrapperStyle.color,
    });
    setRippleWrapperStyle({
      width: rect.width,
      height: rect.height,
      top: rect.y,
      left: rect.x,
      borderRadius: wrapperStyle.borderRadius,
    });
  };

  const handleUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRippleShow(false);
  };

  return (
    <div onMouseDown={handleDown} onMouseUp={handleUp} className="11">
      <Ripple wrapperStyle={rippleWrapperStyle} activeStyles={rippleStyle} in={rippleShow} />
      {children}
    </div>
  );
};

export default RipperWrapper;
