import React from 'react';
import styled from 'styled-components';

import acdIcon from 'static/acd.png';
import gDriveIcon from 'static/gdrive.png';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const TopRow = styled.table`
  width: 100%;
  min-height: 30px;
  table-layout: fixed;
  border-bottom: 1px solid grey;
  border-spacing: 0px 2px;
`;

const BottomRow = styled.table`
  width: 100%;
  min-height: 30px;
  table-layout: fixed;
  border-spacing: 0px 2px;
`;

const Single = styled.div`
  margin: 5px 0;
  border: 1px solid black;
  box-shadow: 2px 2px 2px #888888;
`;

const NameTd = styled.td`
  overflow: scroll;
  padding: 0px 3px;
  border-right: hidden;
`;

const Td = styled.td`
  border-right: 1px solid grey;
`;
const RightTd = styled.td`
  border-right: hidden;
`;

const UploadIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: grayscale(${props => (props.complete ? '0%' : '100%')});
`;

const Circle = styled.div`
  margin: 0 auto;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: ${props => props.color || 'grey'};
`;

const statusIcon = status => {
  switch (status) {
    case 'error':
      return <Circle color="#B31B1B" />;
    case 'complete':
      return <Circle color="#5fba7d" />;
    default:
      return <Circle />;
  }
};

export default props => {
  const { downloads, queue, getServerState } = props;
  console.log('DownloadsList', downloads);
  console.log('Queue', queue);

  return (
    <Container>
      <button onClick={getServerState}>Get server state</button>
      {downloads &&
        downloads.map((d, index) => (
          <Single key={index}>
            <TopRow>
              <tbody>
                <tr>
                  <Td width="10%">{statusIcon(d.status)}</Td>
                  <NameTd width="90%">
                    SOMETHIGNREALLYLONGSOMETHIGNREALLYLONGSOMETHIGNREALLYLONGSOMETHIGNREALLYLONGSOMETHIGNREALLYLONG
                  </NameTd>
                </tr>
              </tbody>
            </TopRow>
            <BottomRow>
              <tbody>
                <tr>
                  <Td width="25%">{d.uptime || ''}</Td>
                  <Td width="20%">
                    {(d.download && d.download.progress) || ''}
                  </Td>
                  <Td width="25%">{(d.download && d.download.speed) || ''}</Td>
                  <Td width="15%">
                    <UploadIcon
                      src={acdIcon}
                      complete={d.upload && d.upload.acd === 'complete'}
                    />
                  </Td>
                  <RightTd width="15%">
                    <UploadIcon
                      src={gDriveIcon}
                      complete={d.upload && d.upload.gdrive === 'complete'}
                    />
                  </RightTd>
                </tr>
              </tbody>
            </BottomRow>
          </Single>
        ))}
    </Container>
  );
};

// <thead>
//   <tr>
//     <th />
//     <th />
//     <th />
//     <th colSpan="2">Upload</th>
//     <th colSpan="2">Processing</th>
//   </tr>
//   <tr>
//     <th />
//     <th>URL</th>
//     <th>Up</th>
//     <th>%</th>
//     <th>Speed</th>
//     <th>A</th>
//     <th>G</th>
//   </tr>
// </thead>
