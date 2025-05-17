declare module 'react-native-floating-action-button' {
  import { ComponentType } from 'react';
  
  interface FloatingActionButtonProps {
    onPress?: () => void;
    icon?: string;
  }

  const FloatingActionButton: ComponentType<FloatingActionButtonProps>;
  export default FloatingActionButton;
} 