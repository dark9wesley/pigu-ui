import React, { useRef, useState } from 'react';
import Ripple from './ripple';
import { TransitionGroup } from 'react-transition-group';

interface RipperWrapperProps {}

const RipperWrapper: React.FC<RipperWrapperProps> = ({ children }) => {
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | undefined>(undefined);
  const [rippleWrapperStyle, setRippleWrapperStyle] = useState<React.CSSProperties | undefined>(
    undefined,
  );
  const [rippleShow, setRippleShow] = useState(false);
  const [rippleArray, setRippleArray] = useState([]);

  // 获取目标style
  const getTargetStyle = (target: Element) => {
    const targetStyle = getComputedStyle(target);
    const { borderRadius, color } = targetStyle || {};

    const { width, height, x, y, top, left, right, bottom } = target.getBoundingClientRect() || {};
    return {
      x,
      y,
      width,
      height,
      top,
      left,
      right,
      bottom,
      borderRadius,
      color,
    };
  };

  const computeHypotenuse = (baseSide: number, height: number) => {
    return Math.sqrt(baseSide ** 2 + height ** 2);
  };

  const getlongest = (
    clientX: number,
    clientY: number,
    top: number,
    right: number,
    bottom: number,
    left: number,
  ) => {
    const leftTop = computeHypotenuse(clientY - top, clientX - left);
    const rightTop = computeHypotenuse(clientY - top, right - clientX);
    const leftBottom = computeHypotenuse(clientX - left, bottom - clientY);
    const rightBottom = computeHypotenuse(right - clientX, bottom - clientY);

    return [leftTop, rightTop, leftBottom, rightBottom].sort((a, b) => b - a)[0];
  };

  const handleDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 获取目标style并赋值给rippleWrapper
    const {
      width,
      height,
      top,
      right,
      bottom,
      left,
      x: rectX,
      y: rectY,
      borderRadius,
      color,
    } = getTargetStyle(e.target as Element);
    setRippleWrapperStyle({
      width,
      height,
      top: rectY,
      left: rectX,
      borderRadius,
    });

    // 获取点击坐标
    const x = e.clientX - rectX;
    const y = e.clientY - rectY;
    // 获取ripple半径
    const rippleRadius = getlongest(e.clientX, e.clientY, top, right, bottom, left);
    setRippleStyle({
      top: y - rippleRadius,
      left: x - rippleRadius,
      width: rippleRadius * 2,
      height: rippleRadius * 2,
      backgroundColor: color,
    });

    setRippleShow(true);
  };

  const handleUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRippleShow(false);
  };

  return (
    <div onMouseDown={handleDown} onMouseUp={handleUp}>
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          pointerEvents: 'none',
          ...rippleWrapperStyle,
        }}
      >
        <Ripple show={rippleShow} rippleStyle={rippleStyle} />
      </div>
      {children}
    </div>
  );
};

export default RipperWrapper;
