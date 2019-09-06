import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.svg';

const Logo = styled.img`
  height: ${props => props.height};
`;
Logo.defaultProps = {
  height: '32px',
  src: logo
};

export default Logo;
