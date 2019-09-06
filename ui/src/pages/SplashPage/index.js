import React from 'react';
import styled from 'styled-components';

import { authenticate, loadClient } from '../../services/google';
import Logo from '../../components/Logo';

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0e1029;
`;
const SplashText = styled.h3`
  color: #ee2e31;
`;
const SplashButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  margin-bottom: 256px;
  font-size: 18px;
  font-family: 'SofiaPro';
  color: white;
  background: #ee2e31;
  border-color: #c32629;
  border-radius: 4px;
  transition: all 0.25s ease-out;
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px #c32629;
  }
`;

export default class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.promptGoogleAuth = this.promptGoogleAuth.bind(this);
  }

  async promptGoogleAuth() {
    await authenticate().then(loadClient);
    this.props.history.push('/home');
  }

  render() {
    return (
      <SplashContainer>
        <Logo height="128px" />
        <SplashText>
          Watch and chat with YouTube Gaming's most popular communities.
        </SplashText>
        <SplashButton onClick={this.promptGoogleAuth}>Get Started</SplashButton>
      </SplashContainer>
    );
  }
}
