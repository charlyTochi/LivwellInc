import React from 'react';
import * as Animatable from 'react-native-animatable';
import {ViewProps} from 'react-native';

interface AnimatedViewWrapperProps extends ViewProps {
  animation: string;
  duration: number;
  delay?: number;
  children: React.ReactNode;
}

const AnimatedViewWrapper: React.FC<AnimatedViewWrapperProps> = ({
  animation,
  duration,
  delay = 0,
  children,
  ...rest
}) => {
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      delay={delay}
      {...rest}>
      {children}
    </Animatable.View>
  );
};

export default AnimatedViewWrapper;
