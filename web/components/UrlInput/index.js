import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  background-color #fff;
  border: 2px solid #d0d0d0;
  height: 2.8em;
`;

const UrlBox = styled.input`
  color: #f7f7f7;
  display: block;
  width: 100%;
  height: 100%;
  font-family: Helvetica;
  font-size: 1.1em;
  position: relative;
  z-index: 1;
  top: -1px;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  padding-left: 5px;
  position: relative;
  z-index: 1;
  top: -1px;
`;

const Download = styled.input`
  position: absolute;
  display: block;
  min-width: 50px;
  border-radius: 2px;
  height: auto;
  line-height: 1.5em;
  appearance: none;
  z-index: 2;
  top: 0;
  bottom: 0;
  right: 2px;
  left: auto;
  outline: none;
  margin: auto;
  background: transparent;
  border: none;
  background-size: 35px 35px;
  background-position: 50% 50%;
  background-image: url(/static/cloud.png);
  background-repeat: no-repeat;
`;

class UrlInput extends Component {
  state = {
    input: '',
  };

  handleKeyPress(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.state.input === '') return;
    if (this.props.submit) this.props.submit();
    this.setState({
      input: '',
    });
  }

  render() {
    const { input } = this.state;
    return (
      <Form>
        <UrlBox
          onChange={e => this.handleKeyPress(e)}
          onKeyDown={e => this.handleEnter(e)}
          value={input}
        />
        <Download type="submit" value="" onClick={() => this.handleSubmit()} />
      </Form>
    );
  }
}

export default UrlInput;
