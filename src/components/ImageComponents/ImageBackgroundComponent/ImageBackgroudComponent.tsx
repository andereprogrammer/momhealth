import React from 'react';
import {styled} from 'styled-components/native';
import {ImageBgProps} from './types';

// import { Container } from './styles';

const ImageBackgroundComponent: React.FC<ImageBgProps> = props => {
  const BackgroundImage = styled.ImageBackground`
    flex: 1;
    width: null;
    height: null;
  `;
  return (
    <BackgroundImage
      resizeMethod="resize"
      resizeMode="contain"
      style={props.style}
      source={props.source}>
      {props.children}
    </BackgroundImage>
  );
};

export default ImageBackgroundComponent;
