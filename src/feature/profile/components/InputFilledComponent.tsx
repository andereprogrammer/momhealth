import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import theme from '../../../theme/Theme';

interface InputComponentProps {
  label: string;
  maxLength: number;
  helper?: boolean;
  placeholder: string;
  helperText?: string;
  isfilled?: boolean;
  secureTextEntry?: boolean;
  error?: string;
  onBlur?: () => void;
  keyboardType: KeyboardTypeOptions;
  onFocus?: () => void;
  value: string | undefined;
}
const InputFilledComponent: React.FC<InputComponentProps> = ({
  label,
  isfilled,
  secureTextEntry,
  placeholder,
  error,
  maxLength,
  value,
  helperText,
  helper,
  keyboardType,
  onBlur = () => {},
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme<Theme>();
  return (
    <View style={styles.inputContainer}>
      <Text style={theme.textVariants.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        autoComplete="off"
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        // onChangeText={onChangeText}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
          Keyboard.dismiss();
        }}
        style={[
          styles.input,
          {
            borderColor: error
              ? 'red'
              : isFocused
              ? theme.colors.cardPrimaryBackground
              : isfilled
              ? theme.colors.inputBg
              : theme.colors.inputBg,
          },
        ]}
        placeholderTextColor={'#cbcbcb'}
        {...props}
        // value={text}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helper && (
        <Text
          style={{
            textAlign: 'left',
            paddingLeft: 10,
            fontSize: 10,
            marginTop: 5,
            color: '#000',
          }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default InputFilledComponent;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLabel: {
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    fontFamily: 'DMSans-Medium',
    backgroundColor: theme.colors.inputBg,
    color: '#000',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    paddingVertical: 8,
    paddingLeft: 4,
  },
});
