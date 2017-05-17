import React from 'react';
import styled from 'styled-components';
import { media } from '../style';

import UrlInput from '../components/UrlInput/index.js';

const Container = styled.div`
  display: flex;
  background-color: #B31B1B;
  color: #f7f7f7;
  width: 100%;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin: 0 auto;

  ${media.desktop`
    width: 60%;
  `}
`;

const Row = styled.div`
  flex: 1 100%;
  padding: 20px 7px;

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
      <Column>
        <Row>
          <Logo src="/static/logo.png" />
          <h1>Mega Archive</h1>
        </Row>
        <Row><UrlInput /></Row>
      </Column>
    </Container>
  );
};
