import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const BackButtonArrow = require('../../../../assets/img/ButtonBack.png');

const BackButtonImage = styled.Image`
    margin: 15px;
    height: 18px;
    width: 16px;
`;

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.pop()}>
    <BackButtonImage source={BackButtonArrow} />
  </TouchableOpacity>
);

export default BackButton;
