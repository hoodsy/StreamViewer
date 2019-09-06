import React from 'react';
import styled from 'styled-components';

import { fetchStreams } from '../../services/google';
import RelatedStreams from '../../components/RelatedStreams';
import Chat from '../../components/Chat';
import Nav from '../../components/Nav';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ededf8;
`;
const HomeRow = styled.div`
  display: flex;
`;

export default class HomePage extends React.Component {
  state = {
    streams: null,
    activeStream: null,
    activeStreamVideoId: null
  };

  async componentWillMount() {
    if (!window.gapi.client) return this.props.history.push('/');
    const streams = await fetchStreams();
    this.setState({
      streams: streams.result.items,
      activeStream: streams.result.items[0],
      activeStreamVideoId: streams.result.items[0].id.videoId
    });
  }

  changeActiveStream = channelId => {
    const activeStream = this.state.streams.filter(
      ({ snippet }) => snippet.channelId == channelId
    )[0];
    this.setState({
      activeStream,
      activeStreamVideoId: activeStream.id.videoId
    });
  };

  formatRelatedStreams = () => {
    return this.state.streams.filter(
      ({ snippet }) =>
        this.state.activeStream.snippet.channelId != snippet.channelId
    );
  };

  render() {
    if (!this.state.streams) return null;

    return (
      <HomeContainer>
        <Nav />
        <HomeRow>
          <RelatedStreams
            streams={this.formatRelatedStreams()}
            onClick={this.changeActiveStream}
          />
          <iframe
            type="text/html"
            width="100%"
            height="auto"
            src={`https://www.youtube.com/embed/live_stream?channel=${this.state.activeStream.snippet.channelId}&autoplay=1`}
          />
          <Chat videoId={this.state.activeStreamVideoId} />
        </HomeRow>
      </HomeContainer>
    );
  }
}
