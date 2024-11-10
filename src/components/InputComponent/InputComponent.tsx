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
import theme, {Theme} from '../../theme/Theme';
import {fonts} from '../../theme/enum';

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
  value?: string | undefined;
}
const InputComponent: React.FC<InputComponentProps> = ({
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
        // value={value}
        secureTextEntry={secureTextEntry}
        // onChangeText={onChangeText}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
          // Keyboard.dismiss();
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
            fontSize: 12,
            marginTop: 5,
            color: '#000',
          }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 8,
  },
  inputLabel: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    fontFamily: fonts.SecondaryDMSansMedium,
    backgroundColor: theme.colors.inputBg,
    color: '#000',
  },
  errorText: {
    color: 'red',
    paddingVertical: 8,
    paddingLeft: 4,
  },
});
