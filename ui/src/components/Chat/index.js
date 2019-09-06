import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import Message from './Message';
import {
  fetchStreamDetails,
  fetchMessages,
  insertMessage
} from '../../services/google';

// ChatInput
// ==================================
// ==================================

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $channelId: String!
    $liveChatId: String!
    $text: String!
  ) {
    createMessage(channelId: $channelId, liveChatId: $liveChatId, text: $text) {
      id
      liveChatId
      text
    }
  }
`;

const ChatInputContainer = styled.textarea`
  padding: 4px;
  border: none;
  border-top: 1px solid grey;
  resize: vertical;
`;

function ChatInput({
  value,
  liveChatId,
  getChatMessages,
  handleChange,
  handleClearInput
}) {
  const [createMessage, { data }] = useMutation(CREATE_MESSAGE);
  const handleSendMessage = async e => {
    if (e.key === 'Enter') {
      // send message with youtube API
      const res = await insertMessage({
        liveChatId: liveChatId,
        text: value
      });
      // persist message in DB
      const response = await createMessage({
        variables: {
          channelId: res.result.snippet.authorChannelId,
          liveChatId: res.result.snippet.liveChatId,
          text: value
        }
      });
      console.log(response);
      // update chat with new messages
      handleClearInput();
      await getChatMessages();
    }
  };

  return (
    <ChatInputContainer
      type="text"
      rows={6}
      value={value}
      placeholder="Type message here..."
      onChange={handleChange}
      onKeyDown={handleSendMessage}
    />
  );
}

// Chat
// ==================================
// ==================================

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  max-height: calc(100vh - 80px);
  overflow: auto;
  margin-left: 8px;
  margin-right: 8px;
`;
const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.getChatMessages = this.getChatMessages.bind(this);
  }

  state = {
    messages: null,
    liveChatId: null,
    inputMessage: ''
  };

  async componentWillMount() {
    await this.getChatMessages();
  }

  async componentDidUpdate(prevProps) {
    // if active stream changes, update chat messages
    if (this.props.videoId !== prevProps.videoId) {
      await this.getChatMessages();
    }
  }

  async getChatMessages() {
    const details = await fetchStreamDetails(this.props.videoId);
    const messages = await fetchMessages(
      details.result.items[0].liveStreamingDetails.activeLiveChatId
    );
    const parsedMessages = messages.result.items
      .map(message => {
        if (!message.snippet.textMessageDetails) {
          return { id: null, text: null };
        }
        return {
          id: message.id,
          text: message.snippet.textMessageDetails.messageText
        };
      })
      .filter(message => {
        return message.id != null;
      });
    this.setState({
      messages: parsedMessages,
      liveChatId: details.result.items[0].liveStreamingDetails.activeLiveChatId
    });
  }

  handleMessageInput = e => {
    this.setState({
      inputMessage: e.target.value
    });
  };

  handleClearInput = () => {
    this.setState({ inputMessage: '' });
  };

  render() {
    if (!this.state.messages) return null;
    return (
      <ChatContainer>
        <ChatMessages>{this.state.messages.map(Message)}</ChatMessages>

        <ChatInput
          value={this.state.inputMessage}
          liveChatId={this.state.liveChatId}
          handleChange={this.handleMessageInput}
          getChatMessages={this.getChatMessages}
          handleClearInput={this.handleClearInput}
        />
      </ChatContainer>
    );
  }
}
