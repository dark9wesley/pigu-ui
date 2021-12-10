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
  color?: string;
  textColor?: string;
  round?: string;
} & NativeProps<'--pigu-button-text-color' | '--pigu-button-bg-color'>;

const classPrefix = 'pigu-button';

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, type, size, block, disabled } = props;

  const classes = classNames(
    `${classPrefix}`,
    {
      [`${classPrefix}-${type}`]: type,
      [`${classPrefix}-${size}`]: size,
      [`${classPrefix}-block`]: block,
      [`${classPrefix}-disabled`]: disabled,
    },
    'pigu-elevation--2',
  );

  return withNativeProps(
    props,
    <button className={classes} disabled={disabled}>
      {children}
    </button>,
  );
};

Button.defaultProps = {
  type: 'default',
  size: 'normal',
};
