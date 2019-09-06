import React from 'react';
import styled from 'styled-components';

import Preview from './Preview';

const RelatedStreamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 467px;
  max-height: 100vh;
  overflow: auto;
`;

const RelatedStreams = ({ streams, onClick }) => (
  <RelatedStreamsContainer>
    {streams.map(({ snippet }) => (
      <Preview key={snippet.channelId} {...snippet} onClick={onClick} />
    ))}
  </RelatedStreamsContainer>
);

export default RelatedStreams;
