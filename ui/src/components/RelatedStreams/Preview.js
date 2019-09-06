import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  padding: 8px;
`;

const PreviewDescription = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
  margin-bottom: 0;
`;

const PreviewChannel = styled.p`
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 0;
`;

const Preview = ({
  onClick,
  channelId,
  channelTitle,
  description,
  thumbnails
}) => (
  <PreviewContainer onClick={() => onClick(channelId)}>
    <img src={thumbnails.medium.url} />
    <PreviewDescription>{description}</PreviewDescription>
    <PreviewChannel>{channelTitle}</PreviewChannel>
  </PreviewContainer>
);

export default Preview;
