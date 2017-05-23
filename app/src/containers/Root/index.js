import React from 'react';
import styled from 'styled-components';
import { media } from 'src/style';

import DownloadsList from 'src/components/DownloadsList';
import UrlInput from 'src/components/UrlInput/component';

import logo from 'static/logo.png';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  text-align: center;
`;

const Body = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  background-color: #B31B1B;
  color: #f7f7f7;
`;

const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1 100%;
  width: 100%;
  margin: 0 auto;

  ${media.desktop`
    width: 60%;
  `}
`;

const Row = styled.div`
  flex: 1 100%;
  margin: 20px 0px;

  ${media.desktop`
    margin: 20px 7px;
  `}

  h1 {
    margin: 0;
  }
`;

const Logo = styled.img`
  height: 80px;
  width: 80px;
`;

const Input = styled.input`
  width: 80%;
`;

const Button = styled.button`
  width: 15%;
`;

export default () => {
  return (
    <Container>
      <Header>
        <Column>
          <Row>
            <Logo src={logo} />
            <h1>Mega Archive</h1>
          </Row>
          <Row><UrlInput /></Row>
        </Column>
      </Header>
      <Body>
        <Column>
          <Row><DownloadsList /></Row>
        </Column>
      </Body>
    </Container>
  );
};
