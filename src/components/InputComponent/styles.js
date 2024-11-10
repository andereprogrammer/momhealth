import styled from 'styled-components/native';
import theme from '../../theme/Theme';

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TextInputHidden = styled.TextInput`
  /* width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 20px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;
export const SplitBoxes = styled.View`
  border-color: #fff;
  border-width: 2px;
  border-radius: 20px;
  padding: 12px;
  min-width: 50px;
  background-color: ${theme.colors.inputBg};
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;;
  color: ${theme.colors.cardPrimaryBackground};
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: ${theme.colors.cardPrimaryBackground};
  background-color: #fff;
`;
