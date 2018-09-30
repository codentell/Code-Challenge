import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components';

const ButtonContainer = styled.View`
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10;
    flex-direction: row;
    box-shadow: 5px 5px 5px #CACAF5;
`;

const ButtonText = styled.Text`
    color: #fff
`;

const CheckMark = require('../../../../assets/img/IconCheckmark.png');

const CheckMarkImage = styled.Image`
    margin-right:10px;
`;


const Button = ({text, onPress, backgroundColor, fontSize, bookMarked}) => (
  <TouchableHighlight onPress={onPress}>
    <ButtonContainer style={{ backgroundColor }}>
      { bookMarked ? <CheckMarkImage source={CheckMark} /> : <Image /> }
      <ButtonText style={{ fontSize }}>
        {text}
      </ButtonText>
    </ButtonContainer>
  </TouchableHighlight>
);

export default Button;
