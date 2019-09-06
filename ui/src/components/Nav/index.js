import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';

const NavContainer = styled.nav`
  background: #0b0d22;
  padding: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Nav() {
  return (
    <NavContainer>
      <Logo />
    </NavContainer>
  );
}

export default Nav;
