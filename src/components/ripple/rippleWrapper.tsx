import React, { useEffect, useState } from 'react';
import Ripple from './ripple';
import { v4 as uuidv4 } from 'uuid';

interface RipperWrapperProps {}

interface RippleArray {
  id: string;
  isDone: boolean;
  rippleElement: JSX.Element;
}

const RipperWrapper: React.FC<RipperWrapperProps> = ({ children }) => {
  const [isDown, setIsDown] = useState(false);
  const [hideIds, setHideIds] = useState<string[]>([]);
  const [rippleArray, setRippleArray] = useState<RippleArray[]>([]);
  const [rippleWrapperStyle, setRippleWrapperStyle] = useState<React.CSSProperties | undefined>(
    undefined,
  );

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
    setIsDown(true);

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

    const id = uuidv4();

    setRippleArray([
      ...rippleArray,
      {
        isDone: false,
        id,
        rippleElement: (
          <Ripple
            key={id}
            id={id}
            animationEndCallBack={animationEndCallBack}
            rippleStyle={{
              top: y - rippleRadius,
              left: x - rippleRadius,
              width: rippleRadius * 2,
              height: rippleRadius * 2,
              backgroundColor: color,
            }}
          />
        ),
      },
    ]);
  };

  const animationEndCallBack = (id: string) => {
    setHideIds([...hideIds, id]);
    // console.log(rippleArray, 'newRippleArray');
    // const newRippleArray = rippleArray.map((item) => ({
    //   ...item,
    //   isDone: id === item.id,
    // }));
    // setRippleArray(newRippleArray);
  };

  const handleUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDown(false);
    // setTimeout(() => {
    //   rippleArray.pop();
    //   setRippleArray([...rippleArray]);
    // }, 800);
  };

  useEffect(() => {
    // if (isDown && hideIds.length) {
    //   const saveId = hideIds[hideIds.length - 1];
    //   const newRippleArray = rippleArray.filter((item) => item.id === saveId);
    //   setRippleArray(newRippleArray);
    //   setHideIds([]);
    //   return;
    // }

    if (!isDown && hideIds.length) {
      const newRippleArray = rippleArray.filter((item) => !hideIds.includes(item.id));
      setRippleArray(newRippleArray);
      setHideIds([]);
      return;
    }
    // if (hideIds.length) {
    //   const newRippleArray = rippleArray.filter((item) => !hideIds.includes(item.id));
    //   console.log(newRippleArray, 'newRippleArray');
    //   setRippleArray(newRippleArray);
    // }
  }, [hideIds, isDown]);
  console.log(rippleArray, 'rippleArray');
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
        {rippleArray.map((item) => item.rippleElement)}
      </div>
      {children}
    </div>
  );
};

export default RipperWrapper;
