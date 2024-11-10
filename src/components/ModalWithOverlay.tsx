import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Modal as RNModal, ModalProps} from 'react-native';
type Props = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const ModalWithOverlay = ({isOpen, withInput, children, ...rest}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 3,
      }}>
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}>
      {content}
    </RNModal>
  );
};

export default ModalWithOverlay;

const styles = StyleSheet.create({});
