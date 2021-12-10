import React from 'react';
import classNames from 'classnames';
import { CSSProperties } from 'react';
import { ReactElement } from 'react-dom/node_modules/@types/react';

export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
}

export function withNativeProps<P extends NativeProps>(props: P, element: ReactElement) {
  const p = { ...element.props };

  if (props.className) {
    p.className = classNames(props.className, p.className);
  }

  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }

  return React.cloneElement(element, p);
}
