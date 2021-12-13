import React from 'react';
import classNames from 'classnames';
import { NativeProps, withNativeProps } from '../../utils/native-props';

type ButtonProps = {
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'mini' | 'small' | 'normal' | 'large';
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  outline?: boolean;
  text?: boolean;
  round?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & NativeProps<
  | '--text-color'
  | '--background-color'
  | '--border-radius'
  | '--border-width'
  | '--border-style'
  | '--border-color'
>;

const classPrefix = 'pigu-button';

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, type, size, block, disabled, text, outline, round, onClick } = props;

  const classes = classNames(
    `${classPrefix}`,
    {
      [`${classPrefix}-${type}`]: type,
      [`${classPrefix}-${size}`]: size,
      [`${classPrefix}-block`]: block,
      [`${classPrefix}-disabled`]: disabled,
      [`${classPrefix}-text`]: text,
      [`${classPrefix}-text-${type}`]: text,
      [`${classPrefix}-outline`]: outline,
      [`${classPrefix}-round`]: round,
    },
    'pigu-elevation--2',
  );

  return withNativeProps(
    props,
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>,
  );
};

Button.defaultProps = {
  type: 'default',
  size: 'normal',
};
