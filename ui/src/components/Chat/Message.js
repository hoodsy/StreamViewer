import React from 'react';
import styled from 'styled-components';

const MessageText = styled.p`
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 12px;
`;

const Message = ({ id, text }) => <MessageText key={id}>{text}</MessageText>;

export default Message;
